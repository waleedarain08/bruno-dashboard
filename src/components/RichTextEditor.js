import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

const RichTextEditor = ({ value, onChange }) => {
    return (
        <ReactQuill
            value={value}
            onChange={onChange}
            modules={RichTextEditor.modules}
            formats={RichTextEditor.formats}
            placeholder="Write here..."
        />
    );
}

// Configuring modules and formats
RichTextEditor.modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        ['bold', 'italic', 'underline'],
        ['link'],
        ['clean']
    ],
};

RichTextEditor.formats = [
    'header', 'font', 'list', 'bullet',
    'bold', 'italic', 'underline',
    'link'
];

export default RichTextEditor;