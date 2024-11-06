import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocation, useNavigate } from 'react-router';
import moment from 'moment';
import { InfinitySpin } from 'react-loader-spinner';
import { useSelector, useDispatch } from 'react-redux';
import { Batch_Ingredients, Batch_Order_By_id } from 'store/batch/batchTypeAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { Button } from '@mui/material';
import { SET_MENU } from 'store/actions';
import Box from '@mui/material/Box';
// import AvatarGroup from '@mui/material/AvatarGroup';
// import Avatar from '@mui/material/Avatar';

const CookingBatch = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const [AllKeys, setAllKeys] = React.useState([]);
  const [FeedingData, setFeedingData] = React.useState([]);
  const BatchIngredientsData = useSelector((state) => state.BatchReducer.BatchIngredientsData);
  const BatchOrderByIdData = useSelector((state) => state.BatchReducer.BatchOrderByIdData);
  const isLoadingBatchOrderById = useSelector((state) => state.BatchReducer.isLoadingBatchOrderById);

  const onPrint = () => {
    dispatch({ type: SET_MENU, opened: false });
    setTimeout(() => {
      window.print();
    }, 200);
  };

  React.useEffect(() => {
    dispatch(Batch_Ingredients(state?._id, Userdata?.clientToken));
    dispatch(Batch_Order_By_id(state?._id, Userdata?.clientToken));
  }, [state]);

  //console.log(AllKeys, 'AllKeys');

  React.useEffect(() => {
    setAllKeys([]);
    if (BatchIngredientsData?.length > 0 || BatchIngredientsData !== undefined) {
      const formattedData = Object.keys(BatchIngredientsData)?.map((key) => {
        const weight = BatchIngredientsData[key]?.weight;
        let contingencyFactor = BatchIngredientsData[key]?.ContingencyFactor;
        if (typeof contingencyFactor === 'string' && contingencyFactor.includes('%')) {
          contingencyFactor = parseFloat(contingencyFactor.replace('%', '')) / 100;
        } else {
          contingencyFactor = parseFloat(contingencyFactor);
          if (contingencyFactor > 1) {
            contingencyFactor = contingencyFactor / 100;
          }
        }
        const adjustedWeight = weight * (1 + contingencyFactor);

        return {
          key: key,
          weight: weight,
          ContingencyFactor: contingencyFactor,
          CookingVolume: adjustedWeight,
          percentageObj: 1 + contingencyFactor
        };
      });
      setAllKeys(formattedData);
    }
  }, [BatchIngredientsData]);
  const sumWithInitial = AllKeys?.reduce((accumulator, currentValue) => accumulator + currentValue?.weight, 0);
 // const sumWithadjustedWeight = AllKeys?.reduce((accumulator, currentValue) => accumulator + currentValue?.CookingVolume, 0);

  const givenDate = moment(state?.createdOnDate);
  const futureDate = givenDate.add(30, 'days');
  const formattedFutureDate = futureDate.format('DD MMM YYYY');
  let individualSum = 0;
  let orderSum = 0;

  React.useEffect(() => {
    if (BatchOrderByIdData?.length > 0) {
      let newarrr = BatchOrderByIdData?.map((w) => {
        return w?.orderItems
          ?.map((z) => {
            if (z?.planType === 'Transitional') {
              let extractString = z?.pouchesDetail[0].split('|');
              let newData = [];
              extractString.forEach((segment) => {
                let match = segment.match(/(\d+) servings x (\d+\d+) grams/);
                if (match) {
                  newData.push({
                    day: parseInt(match[1]),
                    value: parseFloat(match[2])
                  });
                }
              });
              return newData;
            } else {
              return z?.totalWeight[0];
            }
          })
          .flat(2);
      });
      setFeedingData(newarrr);
    }
  }, [BatchOrderByIdData]);

  let maxLength = Math.max(...FeedingData.map((innerArray) => innerArray?.length));
  let rows = [];
  for (let i = 0; i < maxLength; i++) {
    rows.push(i);
  }
  return (
    <>
      {isLoadingBatchOrderById ? (
        <Paper sx={{ width: '100%', mb: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <InfinitySpin width="200" color="#D78809" />
          </div>
        </Paper>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div
              style={{
                border: '1px solid #D78809',
                width: 30,
                display: 'flex',
                justifyContent: 'center',
                borderRadius: 50,
                margin: 5,
                padding: 2
              }}
            >
              <ArrowBackIcon onClick={() => navigate(-1)} style={{ color: '#D78809' }} />
            </div>
            <AnimateButton>
              <Button onClick={() => onPrint()} style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                Print
              </Button>
            </AnimateButton>
          </div>

          <Paper sx={{ width: '40%', marginBottom: 4 }}>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableCell align="left">Batch Ref.</TableCell>
                  <TableCell align="left">{state?.batchNumber}</TableCell>
                </TableBody>
                <TableBody>
                  <TableCell align="left">Production Date:</TableCell>
                  <TableCell align="left">{moment(state?.createdOnDate).format('DD MMM YYYY')}</TableCell>
                </TableBody>
                <TableBody>
                  <TableCell align="left">Expiry Date:</TableCell>
                  <TableCell align="left">{formattedFutureDate}</TableCell>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <Paper>
            <TableContainer>
              <Table aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontWeight: '800' }} align="left" colSpan={1}>
                      Batch Cooking Ingredients:
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                      Ingredient Ref
                    </TableCell>
                    <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                      Ingredient Description
                    </TableCell>
                    <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                      Cooking Volume (grams)
                    </TableCell>
                    <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                      Contingency Factor (%)
                    </TableCell>
                    <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                      Total Orders Volume (grams)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {AllKeys?.map((i, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell align="center">{i?.key}</TableCell>
                        <TableCell align="center">{Math.trunc(i?.weight)}</TableCell>
                        <TableCell align="center">{i?.ContingencyFactor}</TableCell>
                        <TableCell align="center">{Math.trunc(i?.CookingVolume)}</TableCell>
                      </TableRow>
                    );
                  })}
                  <TableRow>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell style={{ fontWeight: '700' }} align="center">
                      {Math.trunc(sumWithInitial)}
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell style={{ fontWeight: '700' }} align="center">
                      {Math.trunc(sumWithInitial)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          {BatchOrderByIdData?.map((items) => {
            orderSum = 0;
             // let orderIngredients = Object.entries(items?.ingredientConsumption).map(([name, value]) => ({ name, value }));
            return (
              <>
                <p
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold',
                    backgroundColor: '#000',
                    padding: '20px',
                    marginTop: '60px',
                    color: '#fff'
                  }}
                >
                  Order: {items?._id?.substring(items?._id?.length - 5)}
                </p>
                <Paper sx={{ marginTop: 4 }}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell style={{ fontWeight: '800' }} align="left" colSpan={2}>
                            COOKING SHEET PER ORDER :
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ width: 250, fontWeight: '800' }} align="center"></TableCell>
                          <TableCell style={{ width: 250, fontWeight: '800' }} align="center"></TableCell>
                          <TableCell style={{ width: 250, fontWeight: '800' }} align="center"></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ width: 250, backgroundColor: '#D78809' }} align="center">
                            Ingredient Ref
                          </TableCell>
                          <TableCell style={{ width: 250, backgroundColor: '#D78809' }} align="center">
                            Ingredient Description
                          </TableCell>
                          <TableCell style={{ width: 250, backgroundColor: '#D78809' }} align="center">
                            Cooking Volume (grams)
                          </TableCell>
                          {items?.orderItems
                            ?.map((u, index) =>
                              u?.recipes?.map(
                                (x) =>
                                  (x?.category === '' || x?.category === 'Standard Recipes') && (
                                    <TableCell key={index} style={{ width: 250, backgroundColor: '#D78809' }} align="center">
                                      {x?.name} ({x?.lifeStage})
                                    </TableCell>
                                  )
                              )
                            )
                            .flat(2)
                            .filter((name) => name !== undefined)}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.entries(items?.ingredientConsumption).map(([key,value], index) =>{
                          orderSum += Math.trunc(value);
                          //console.log(key,value);
                          return (
                            <TableRow key={index}>
                              <TableCell style={{ width: 250 }} align="center">
                                {index+1}
                              </TableCell>
                              <TableCell style={{ width: 250 }} align="center">
                                {key}
                              </TableCell>
                              <TableCell style={{ width: 250 }} align="center">
                                {Math.trunc(value)}
                              </TableCell>
                              
                              {items?.orderItems?.map((z,newIndex) =>
                                  z?.recipes?.map((r) => {
                                      let record = r.recipeIngredientTotal && Object.entries(r.recipeIngredientTotal).map(([nkey,nvalue])=>({nkey,nvalue}));
                                      let anOther = record?.filter((u) => u?.nkey == key);
                                        //console.log(anOther);
                                      //individualSum += r.category == "" || r.category == "Standard Recipes"?anOther?.length > 0?Math.trunc(anOther[0].nvalue):0:0;
                                        return (
                                           <TableCell style={{ width: 250 }} key={newIndex} align="center">{r.category == "" || r.category == "Standard Recipes"?anOther?.length > 0?Math.trunc(anOther[0].nvalue):"--":""}</TableCell>
                                         )
                                  }
                                ))
                              }
                              {/* {items?.orderItems?.map((z, newIndex) =>
                                z?.recipes?.map((r) => {
                                  let updatedData =
                                    items?.ingredientConsumption &&
                                    Object.entries(items?.ingredientConsumption).map(([name, value]) => ({ name, value }));
                                 console.log("updatedData",updatedData);   
                                  let anOther = updatedData?.filter((u) => u?.name == i?.key);
                                  let contingencyFactor = i?.ContingencyFactor;
                                  if (typeof contingencyFactor === 'string' && contingencyFactor.includes('%')) {
                                    contingencyFactor = parseFloat(contingencyFactor.replace('%', '')) / 100;
                                  } else {
                                    contingencyFactor = parseFloat(contingencyFactor);
                                    if (contingencyFactor > 1) {
                                      contingencyFactor = contingencyFactor / 100;
                                    }
                                  }
                                  console.log("another",anOther);
                                  const adjustedWeight = anOther?.[0]?.value * (1 + contingencyFactor);
                                  return (
                                    <TableCell style={{ width: 250 }} key={newIndex} align="center">
                                      {(r.category == "" || r.category == "Standard Recipes") ?  anOther?.length > 0 ? Math.trunc(adjustedWeight) : '--' : ''}
                                    </TableCell>
                                  );
                                })
                              )} */}
                            </TableRow>
                          );
                        })}
                        <TableRow>
                          <TableCell style={{ width: 250 }} align="center"></TableCell>
                          <TableCell style={{ width: 250 }} align="center"></TableCell>
                          <TableCell style={{ width: 250, fontWeight: '700' }} align="center">
                           {orderSum}
                          </TableCell>

                          {/* {items?.orderItems?.map((z, index) =>
                            z?.recipes?.map(() => {
                              let updatedData =
                                items?.ingredientConsumption &&
                                Object.entries(items?.ingredientConsumption).map(([name, value]) => ({ name, value }));
                              let newS = updatedData?.map((u) => {
                                const matchingItem = AllKeys.find((a) => u?.name === a.key);
                                let matched;
                                if (matchingItem) {
                                  let contingencyFactor = matchingItem?.ContingencyFactor;
                                  if (typeof contingencyFactor === 'string' && contingencyFactor.includes('%')) {
                                    contingencyFactor = parseFloat(contingencyFactor.replace('%', '')) / 100;
                                  } else {
                                    contingencyFactor = parseFloat(contingencyFactor);
                                    if (contingencyFactor > 1) {
                                      contingencyFactor = contingencyFactor / 100;
                                    }
                                  }
                                  matched = u?.value * (1 + contingencyFactor);
                                }
                                return { value: matched };
                              });
                              const newSum = newS?.reduce((accumulator, currentValue) => accumulator + currentValue?.value, 0);
                              return ( */}
                              {
                            //Object.entries(items?.ingredientConsumption).map(([key]) =>{
                              items?.orderItems?.map((z,newIndex) =>
                                  z?.recipes?.map((r) => {
                                    individualSum = 0;
                                      r.recipeIngredientTotal && Object.entries(r.recipeIngredientTotal).map((val)=>{
                                         // console.log(val[1]);
                                         individualSum += r.category == "" || r.category == "Standard Recipes"?Math.trunc(val[1]):0;
                                      });
                                      //let anOther = record?.filter((u) => u?.nkey == key);
                                      //console.log(anOther);
                                      //individualSum += r.category == "" || r.category == "Standard Recipes"?Math.trunc(record[0].nvalue):0;
                                      //console.log(individualSum);
                                      //orderSum+=  individualSum;
                                      return (
                                           <TableCell style={{ width: 250, fontWeight:600 }} key={newIndex} align="center">{r.category == "" || r.category == "Standard Recipes"?individualSum:""}</TableCell>
                                         )
                                  }
                                ))
                              //})
                              }
                               
                              {/* );
                            })
                          )} */}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
                <Paper sx={{ marginTop: 4 }}>
                  <TableContainer>
                    <TableRow>
                      <TableCell style={{ fontWeight: '800' }} align="left" >
                      ORDER PACKAGING INSTRUCTIONS :
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>

                      {/* <TableCell align="right" >
                        <AnimateButton>
                          <Button onClick={() =>
                            navigate("/cooking-sheet/batch-lable", {
                              state: items
                            })
                          } style={{ margin: '12px' }} variant="contained" color="primary" sx={{ boxShadow: 'none' }}>
                            Batch Label
                          </Button>
                        </AnimateButton>
                      </TableCell> */}
                    </TableRow>
                    {items?.orderItems?.map((historyRow, index) => {
                      let typeofPouch = typeof historyRow?.pouchesDetail;
                      let newpouchesDetail = historyRow?.pouchesDetail && historyRow?.pouchesDetail;
                      const content = newpouchesDetail && typeofPouch === 'string' && newpouchesDetail?.slice(2, -2);
                      const resultArray =
                        historyRow?.pouchesDetail?.length > 1
                          ? historyRow?.pouchesDetail
                          : newpouchesDetail && typeofPouch === 'string'
                          ? content?.split(/\\n|\|/)
                          : historyRow?.pouchesDetail[0]?.split('|');

                      // let tArry = [3, 3, 3, 1];
                      return (
                        <>
                          <Table size="small" aria-label="purchases">
                            <TableBody>
                              <TableRow>
                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                                  <Box sx={{ margin: 1 }}>
                                    {historyRow?.planType === 'Transitional' ? (
                                      <Table size="small" aria-label="purchases">
                                        <TableHead key={index}>
                                          <TableRow>
                                            <TableCell style={{ fontWeight: 'bold' }} align="center">
                                              Pet Name
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }}>Feeding Routine Per Day</TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="left">
                                              Product Description
                                            </TableCell>
                                            <TableCell style={{ fontWeight: 'bold' }} align="left">
                                              Serving
                                            </TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          <>
                                            <TableRow>
                                              <TableCell rowSpan={resultArray?.length} align="center">
                                                {historyRow?.pet?.name}
                                              </TableCell>
                                              
                                              <TableCell rowSpan={resultArray?.length} component="th" scope="row">
                                                {historyRow?.planType}
                                              </TableCell>
                                              <TableCell rowSpan={resultArray?.length} align="center">
                                                {historyRow?.pet?.feedingRoutine} times
                                              </TableCell>
                                              <TableCell align="center">
                                                {resultArray?.map((x, index) => (
                                                  <TableRow key={index}>
                                                    <TableCell align="center">{`${historyRow?.recipes?.[0]?.name} (${historyRow?.recipes?.[0]?.lifeStage})`}</TableCell>
                                                  </TableRow>
                                                ))}
                                              </TableCell>

                                              <TableCell align="left">
                                                {resultArray?.map((y, index) => (
                                                  <TableRow key={index}>
                                                    <TableCell align="left">{y}</TableCell>
                                                  </TableRow>
                                                ))}
                                              </TableCell>
                                            </TableRow>
                                          </>
                                          {/* ))} */}
                                        </TableBody>
                                      </Table>
                                    ) : historyRow?.planType === 'Monthly' ? (
                                      <Table size="small" aria-label="purchases">
                                        {historyRow?.recipes?.map((item, i) => (
                                          <>
                                            <TableHead key={i}>
                                              <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">
                                                  Pet Name
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Feeding Routine Per Day</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">
                                                  Product Description
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">
                                                  Serving
                                                </TableCell>
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              <TableRow>
                                                <TableCell align="center">{historyRow?.pet?.name}</TableCell>
                                                <TableCell component="th" scope="row">
                                                  {historyRow?.planType}
                                                </TableCell>
                                                <TableCell rowSpan={resultArray?.length} align="center">
                                                {historyRow?.pet?.feedingRoutine} times
                                              </TableCell>
                                                <TableCell align="center">{item?.name} ({item?.lifeStage})</TableCell>

                                                <TableCell align="center" component="th" scope="row">
                                                  {resultArray?.length > 1 ? (
                                                    <p>{resultArray[i]}</p>
                                                  ) : (
                                                    resultArray?.map((x, index) => <p key={index}>{x}</p>)
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                            </TableBody>
                                          </>
                                        ))}
                                      </Table>
                                    ) : (
                                      //items.category === "Standard Recipes" &&
                                      <Table size="small" aria-label="purchases">
                                        {historyRow?.recipes?.map((item, i) => (
                                          item.category === "Standard Recipes" &&
                                          <>
                                            <TableHead key={i}>
                                              <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}></TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">
                                                  Product Description
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">
                                                  Quantity
                                                </TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }} align="center">
                                                  Serving
                                                </TableCell>
                                                {item?.selectedItemSize && (
                                                  <TableCell style={{ fontWeight: 'bold' }} align="right">
                                                    Selected Size
                                                  </TableCell>
                                                )}
                                              </TableRow>
                                            </TableHead>
                                            <TableBody>
                                              <TableRow>
                                                <TableCell align="center"></TableCell>
                                                <TableCell component="th" scope="row">
                                                  {historyRow?.planType}
                                                </TableCell>
                                                <TableCell align="center">{item?.name} ({item?.lifeStage})</TableCell>
                                                <TableCell align="center">{item?.quantity}</TableCell>
                                                <TableCell align="center" component="th" scope="row">
                                                  -
                                                </TableCell>
                                                {item?.selectedItemSize && (
                                                  <TableCell align="right">
                                                    {item?.selectedItemSize?.price}-AED <br></br>
                                                    {item?.selectedItemSize?.name}
                                                  </TableCell>
                                                )}
                                              </TableRow>
                                            </TableBody>
                                          </>
                                        ))}
                                      </Table>
                                    )}
                                  </Box>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </>
                      );
                    })}
                  </TableContainer>
                </Paper>
              </>
            );
          })
          }
        </>
      )}
    </>
  );
};

export default CookingBatch;
