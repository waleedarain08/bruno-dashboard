import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useLocation } from 'react-router';
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { Batch_Ingredients, Batch_Order_By_id } from 'store/batch/batchTypeAction';

const CookingBatch = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const Userdata = useSelector((state) => state.AuthReducer.data);
  const [AllKeys, setAllKeys] = React.useState([]);
  const [FeedingData, setFeedingData] = React.useState([]);
  const BatchIngredientsData = useSelector((state) => state.BatchReducer.BatchIngredientsData);
  const BatchOrderByIdData = useSelector((state) => state.BatchReducer.BatchOrderByIdData);

  React.useEffect(() => {
    dispatch(Batch_Ingredients(state?._id, Userdata?.clientToken));
    dispatch(Batch_Order_By_id(state?._id, Userdata?.clientToken));
  }, [state]);

  React.useEffect(() => {
    if (BatchIngredientsData?.length > 0 || BatchIngredientsData !== undefined) {
      const formattedData = Object.keys(BatchIngredientsData).map((key) => {
        const weight = BatchIngredientsData[key].weight;
        const contingencyFactor = BatchIngredientsData[key].ContingencyFactor;
        const percentage = parseFloat(contingencyFactor.replace('%', '')) / 100;
        const adjustedWeight = weight * (1 + percentage);

        return {
          key: key,
          weight: weight,
          ContingencyFactor: contingencyFactor,
          CookingVolume: adjustedWeight
        };
      });
      setAllKeys(formattedData);
    }
  }, [BatchIngredientsData]);

  const sumWithInitial = AllKeys?.reduce((accumulator, currentValue) => accumulator + currentValue?.weight, 0);
  const sumWithadjustedWeight = AllKeys?.reduce((accumulator, currentValue) => accumulator + currentValue?.CookingVolume, 0);

  const givenDate = moment(state?.createdOnDate);
  const futureDate = givenDate.add(30, 'days');
  const formattedFutureDate = futureDate.format('DD MMM YYYY');

  let nameArr = BatchOrderByIdData?.map((i) => i?.orderItems?.map((u) => u?.recipes?.map((x) => x?.name)))
    .flat(2)
    .filter((name) => name !== undefined);

  React.useEffect(() => {
    if (BatchOrderByIdData?.length > 0) {
      let newarrr = BatchOrderByIdData?.map((w) => {
        return w?.orderItems
          ?.map((z) => {
            if (z?.planType === 'Transitional') {
              let extractString = z?.pouchesDetail[0].split('|');
              // Initialize an array to store the new data
              let newData = [];
              // Processing each segment
              extractString.forEach((segment) => {
                // Extracting day and value from the segment
                let match = segment.match(/(\d+) pouches x (\d+\.\d+) grams/);
                if (match) {
                  // Creating an object and pushing it to the newData array
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

  let PuchesData = BatchOrderByIdData?.map((x) => x?.orderItems).flat(2);

  return (
    <>
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

      <Paper sx={{ width: '100%' }}>
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
                  Total Orders Volume (grams)
                </TableCell>
                <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                  Contingency Factor (%)
                </TableCell>
                <TableCell style={{ backgroundColor: '#D78809' }} align="center">
                  Cooking Volume (grams)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {AllKeys?.map((i, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{i?.key}</TableCell>
                    <TableCell align="center">{i?.weight?.toFixed(2)}</TableCell>
                    <TableCell align="center">{i?.ContingencyFactor}</TableCell>
                    <TableCell align="center">{i?.CookingVolume?.toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell align="center"></TableCell>
                <TableCell style={{ fontWeight: '700' }} align="center">
                  {sumWithInitial?.toFixed(2)}
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell style={{ fontWeight: '700' }} align="center">
                  {sumWithadjustedWeight?.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ width: '100%', marginTop: 4 }}>
        <TableContainer>
          <Table aria-label="sticky table">
            <>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: '800' }} align="left" colSpan={2}>
                    Orders Cooking Ingredients:
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ fontWeight: '800' }} align="center"></TableCell>
                  <TableCell style={{ fontWeight: '800' }} align="center"></TableCell>
                  <TableCell style={{ fontWeight: '800' }} align="center"></TableCell>
                  {BatchOrderByIdData?.map((i, index) => {
                    return (
                      <TableCell key={index} style={{ fontWeight: '800' }} align="center">
                        Order {index + 1}
                      </TableCell>
                    );
                  })}
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
                  {nameArr?.map((i, index) => (
                    <TableCell key={index} style={{ backgroundColor: '#D78809' }} align="center">
                      {i}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {AllKeys?.map((i, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCell align="center">{index + 1}</TableCell>
                      <TableCell align="center">{i?.key}</TableCell>
                      <TableCell align="center">{i?.weight?.toFixed(2)}</TableCell>
                      {BatchOrderByIdData?.map((x, index) => {
                        let updatedData = Object.entries(x?.ingredientConsumption).map(([name, value]) => ({ name, value }));
                        let anOther = updatedData?.filter((u) => u?.name == i?.key);
                        return (
                          <TableCell key={index} align="center">
                            {anOther?.length > 0 ? anOther?.[0]?.value?.toFixed(2) : '--'}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell style={{ fontWeight: '700' }} align="center">
                    {sumWithInitial?.toFixed(2)}
                  </TableCell>
                  {BatchOrderByIdData?.map((x, index) => {
                    let updatedData = Object.entries(x?.ingredientConsumption).map(([name, value]) => ({ name, value }));
                    const newSum = updatedData?.reduce((accumulator, currentValue) => accumulator + currentValue?.value, 0);
                    return (
                      <TableCell style={{ fontWeight: '700' }} key={index} align="center">
                        {newSum?.toFixed(2)}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableBody>
            </>
          </Table>
        </TableContainer>
        <Paper sx={{ width: '100%', marginTop: 10, borderTop: 1 }}>
          <TableContainer>
            <Table aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: '800' }} align="left">
                    Packaging Instructions:
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="left">Daily Feeding Routine:</TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                  {BatchOrderByIdData?.map((u) => {
                    return u?.orderItems?.map((y, index) => (
                      <TableCell style={{ width: 208 }} key={index} align="center">
                        {y?.pet?.feedingRoutine}
                      </TableCell>
                    ));
                  })}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Paper sx={{ width: '100%', marginTop: 10, borderTop: 1 }}>
          <TableContainer>
            <Table aria-label="sticky table">
              {FeedingData?.map((x, firstindex) => {
                return (
                  <TableBody key={firstindex}>
                    <TableRow>
                      <TableCell align="left">Daily Intake (grams):</TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left" style={{ width: 140 }}></TableCell>
                      {x?.map((m, index) => (
                        <TableCell style={{ width: 208 }} key={index} align="center">
                          {FeedingData[index][firstindex]?.value}
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell align="left">Days:</TableCell>
                      <TableCell align="left"></TableCell>
                      <TableCell align="left"></TableCell>
                      {x?.map((m, index) => (
                        <TableCell key={index} align="center">
                          {FeedingData[index][firstindex]?.day}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                );
              })}
            </Table>
          </TableContainer>
        </Paper>
      </Paper>

      <Paper sx={{ width: '100%', marginTop: 4 }}>
        <TableContainer>
          <Table aria-label="sticky table">
            {FeedingData?.map((x, firstindex) => {
              return (
                <TableBody key={firstindex}>
                  <TableRow>
                    <TableCell align="left">Portion / Pouch :</TableCell>
                    {x?.map((m, index) => (
                      <TableCell style={{ width: 208 }} key={index} align="center">
                        {FeedingData[index][firstindex]?.value / PuchesData[index]?.pet?.feedingRoutine}
                      </TableCell>
                    ))}
                  </TableRow>
                  <TableRow>
                    <TableCell align="left">Total Pouches:</TableCell>
                    {x?.map((m, index) => (
                      <TableCell style={{ width: 208 }} key={index} align="center">
                        {FeedingData[index][firstindex]?.day + FeedingData[index][firstindex]?.day}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </TableContainer>
      </Paper>

      <Paper sx={{ width: '100%', marginTop: 4 }}>
        <TableContainer>
          <Table aria-label="sticky table">
            <TableBody>
              <TableRow>
                <TableCell align="left">No of Pouches per 1 serving:</TableCell>
                {BatchOrderByIdData?.map((x, firstindex) => {
                  return (
                    <TableCell key={firstindex} style={{ width: 208 }} align="center">
                      1
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default CookingBatch;
