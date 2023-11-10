import { TextField, Button } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const ModalEdit = (props) => {
  return (
    <div
      className={`modal-add bg-[#00000030] w-[100%] h-[100vh] fixed top-0
        ${props.modalEdit ? "block" : "hidden"}
        `}
    >
      <div className="wrapper-modal bg-[#fff] w-[100%] lg:w-[30%] rounded-[20px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="content p-[40px] flex-col flex gap-[20px]">
          <div className="wrapper-close flex justify-between items-center">
            <p className="text-[24px] font-[500] uppercase">Edit Post</p>
            <Button sx={{ minWidth: "25px" }}>
              <CloseIcon onClick={() => props.setModalEdit(false)} />
            </Button>
          </div>
          <div className="wrapper-form flex flex-col items-center gap-[20px]">
            <TextField
              onChange={(event) => props.setImageEdit(event.target.value)}
              value={props.imageEdit}
              label="Image"
              className="w-[100%]"
            />
            <TextField
              onChange={(event) => props.setTitleEdit(event.target.value)}
              value={props.titleEdit}
              label="Title"
              className="w-[100%]"
            />
            <TextField
              onChange={(event) => props.setDescEdit(event.target.value)}
              value={props.descEdit}
              label="Description"
              className="w-[100%]"
            />
            <Button onClick={() => props.putSave()}>Изменить пост</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEdit;
