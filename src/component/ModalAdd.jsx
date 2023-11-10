import { TextField, Button } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";

const ModalAdd = (props) => {
  return (
    <div
      className={`modal-add bg-[#00000030] w-[100%] h-[100%] fixed top-0 z-10
        ${props.modalAdd ? "block" : "hidden"}
        `}
    >
      <div className="wrapper-modal bg-[#fff] w-[100%] lg:w-[30%] rounded-[20px] absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
        <div className="content p-[40px] flex-col flex gap-[20px]">
          <div className="wrapper-close flex justify-between items-center">
            <p className="text-[24px] font-[500] uppercase">Add Post</p>
            <Button sx={{ minWidth: "25px" }}>
              <CloseIcon onClick={() => props.setModalAdd(false)} />
            </Button>
          </div>
          <div className="wrapper-form flex flex-col items-center gap-[20px]">
            <TextField
              onChange={(event) => props.setImageAdd(event.target.value)}
              value={props.imageAdd}
              label="Image"
              className="w-[100%]"
            />
            <TextField
              onChange={(event) => props.setTitleAdd(event.target.value)}
              value={props.titleAdd}
              label="Title"
              className="w-[100%]"
            />
            <TextField
              onChange={(event) => props.setDescAdd(event.target.value)}
              value={props.descAdd}
              label="Description"
              className="w-[100%]"
            />
            <Button onClick={() => props.postData()}>Добавить пост</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAdd;
