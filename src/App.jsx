// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Switcher from "./component/Switcher";
import "./App.css";
// Animate.css
import "animate.css";
// AOS.css
import AOS from "aos";
import "aos/dist/aos.css";

// My components
import ModalAdd from "./component/ModalAdd";
import ModalEdit from "./component/ModalEdit";
import PorcelainCircle from "./component/PorcelainCircle";
import FooterFeedback from "./component/FooterFeedback";

// import "@fontsource/roboto/300.css";
// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import FilterStatus from "./component/FilterStatus";
// import FilterAllCity from "./component/FilterAllCity";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import CloseIcon from "@mui/icons-material/Close";
import LocalGroceryStoreOutlinedIcon from "@mui/icons-material/LocalGroceryStoreOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import {
  Box,
  Typography,
  Stack,
  Link,
  Container,
  TextField,
  Button,
  Avatar,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  List,
  ListItem,
  ListItemText,
} from "@mui/material/";

function App() {
  // API from db.json
  const API = "http://localhost:3000/data";

  //useState for GET
  const [data, setData] = useState([]);

  // Функция GET
  async function getData() {
    try {
      const { data } = await axios.get(API);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // useState for Modal Add
  const [modalAdd, setModalAdd] = useState(false);

  // useState for Inputs Modal Add
  const [imageAdd, setImageAdd] = useState("");
  const [titleAdd, setTitleAdd] = useState("");
  const [descAdd, setDescAdd] = useState("");

  // Функция POST
  async function postData() {
    try {
      const { data } = await axios.post(API, {
        id: Date.now(),
        image: imageAdd,
        title: titleAdd,
        desc: descAdd,
        isComplete: false,
      });
      setImageAdd("");
      setTitleAdd("");
      setDescAdd("");
      setModalAdd(false);
      getData();
    } catch (error) {}
  }

  // Функция DELETE
  async function deleteData(clickedId) {
    try {
      const { data } = await axios.delete(API + "/" + clickedId);
      getData();
    } catch (error) {
      console.error(error);
    }
  }

  // Функция PUT - Complete
  async function putComplete(clickedItem) {
    try {
      const completeObj = {
        id: clickedItem.id,
        image: clickedItem.image,
        title: clickedItem.title,
        desc: clickedItem.desc,
        isComplete: !clickedItem.isComplete,
      };
      const { data } = await axios.put(API + "/" + clickedItem.id, completeObj);
      getData();
    } catch (error) {
      console.error(error);
    }
  }

  // Functions Edit ==========================

  // useState for Modal Edit
  const [modalEdit, setModalEdit] = useState(false);

  // useState for Inputs Modal Edit
  const [imageEdit, setImageEdit] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [descEdit, setDescEdit] = useState("");

  // useState for idx
  const [idx, setIdx] = useState("");

  // Функция editInput
  function editInput(clickedItem, clickedId) {
    setImageEdit(clickedItem.image);
    setTitleEdit(clickedItem.title);
    setDescEdit(clickedItem.desc);
    setIdx(clickedId);
    setModalEdit(true);
  }

  // Функция Save
  function putSave() {
    const editedObj = {
      image: imageEdit,
      title: titleEdit,
      desc: descEdit,
    };
    setModalEdit(false);
    putEdit(idx, editedObj);
  }

  // Функция PUT - Edit
  async function putEdit(idx, editedObj) {
    try {
      const { data } = await axios.put(API + "/" + idx, editedObj);
      getData();
    } catch (error) {
      console.error(error);
    }
  }
  // =========================================

  // useState for Search
  const [search, setSearch] = useState("");
  async function getSearch() {
    try {
      const { data } = await axios.get(API + "?q=" + search);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  }

  // useEffect for Data
  useEffect(() => {
    getData();
  }, []);
  // useEffect for AOS
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <>
      {/* Section 1 */}
      <main className="dark:bg-[#070914] bg-[#fff] dark:text-[#fff]">
        <header>
          <div className="container">
            <nav className="flex justify-between items-center py-[34px]">
              <a href="">
                <Button>
                  <img
                    src="src/assets/logo-header.svg"
                    alt=""
                    className=" dark:hidden"
                  />
                  <img
                    src="src/assets/logo-header-dark.svg"
                    alt=""
                    className="dark:inline hidden"
                  />
                </Button>
              </a>
              <ul className="flex items-center gap-[40px]">
                <li className="uppercase text-[#AC1313]  hover:text-[#AC1313] hidden lg:block">
                  <a href="">Home</a>
                </li>
                <li className="uppercase hover:text-[#AC1313] hidden lg:block">
                  <a href="">About</a>
                </li>
                <li className="uppercase hover:text-[#AC1313] hidden lg:block">
                  <a href="">Shop</a>
                </li>
                <li className="uppercase hover:text-[#AC1313] hidden lg:block">
                  <a href="">Concact</a>
                </li>
                <li className="burger-menu flex items-center gap-[5px] lg:hidden">
                  <Switcher />
                  <Button>
                    <MenuOutlinedIcon className="text-[#000] dark:text-[#fff]" />
                  </Button>
                </li>
                <li className="lg:flex items-center py-[10px] gap-[30px] px-[20px] border-l-[2px] border-[#EBEBEB] hidden">
                  <Button
                    className="dark:text-[#fff] "
                    sx={{
                      display: "flex",
                      alignContent: "center",
                      color: "#000",
                      fontSize: "12px",
                      fontWeight: "700",
                    }}
                  >
                    <LocalGroceryStoreOutlinedIcon />
                    <a href="">Cart</a>
                  </Button>
                  <Switcher />
                </li>
              </ul>
            </nav>
          </div>
        </header>
        {/* Section 2 */}
        <div className="wrapper-fullscreen dark:bg-[url(src/assets/bg-header-dark.jpg)] py-[94px]">
          <div className="container">
            <div className="wrapper-content flex gap-[50px] lg:gap-[0px] flex-col lg:flex-row justify-between items-center ">
              <aside className="left lg:w-[50%]">
                <div className="wrapper-text flex flex-col items-center text-center lg:text-left gap-[20px] lg:items-start">
                  <p className="uppercase font-[700] text-[14px] text-[#D77474]">
                    Pompeo POttery
                  </p>
                  <p className="text-[48px] leading-[58px] font-[700]">
                    Unique Porcelain Stone Collection
                  </p>
                  <p className="text-[16px] text-[#6C6C6C] dark:text-[#d5d5d5]">
                    Unique & modern pottery made by our master in porcelain &
                    stones
                  </p>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#AC1313",
                      borderRadius: "0px",
                      padding: "20px 35px",
                      ":hover": {
                        backgroundColor: "#AC1313",
                      },
                    }}
                  >
                    Shop Collection
                  </Button>
                </div>
              </aside>
              <aside className="right">
                <img src="src/assets/unique.svg" alt="" />
              </aside>
            </div>
          </div>
        </div>
        {/* Section 3 */}
        <div className="wrapper-porcelain py-[60px] lg:py-[120px] ">
          <div className="container">
            <div className="wrapper-text flex flex-col items-center justify-center gap-[16px] lg:gap-[40px]">
              <p className="text-[#D77474] text-[14px] font-[700] tracking-[2px] uppercase">
                Product Categories
              </p>
              <div className="text-image flex items-start">
                <p className="text-[40px] font-[700]">Porcelain</p>
                <img src="src/assets/porcelain-icon.svg" alt="" />
                <p className="text-[40px] font-[700]">Pottery</p>
              </div>
            </div>

            <div className="wrapper-post flex flex-col items-center gap-[50px]  lg:flex-row flex-wrap lg:items-start justify-center lg:gap-[151px] mt-[60px] ">
              <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper w-[100%] lg:w-[auto]"
              >
                <SwiperSlide>
                  {" "}
                  <PorcelainCircle
                    bg1="bg-[#D8AA61]"
                    bg2="bg-[#E4B366]"
                    image="src/assets/porcelain-circle-1.svg"
                    title="Vases"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <PorcelainCircle
                    bg1="bg-[#E4560F]"
                    bg2="bg-[#F05B10]"
                    image="src/assets/porcelain-circle-2.svg"
                    title="Mugs"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <PorcelainCircle
                    bg1="bg-[#9A0F0F]"
                    bg2="bg-[#A21010]"
                    image="src/assets/porcelain-circle-3.svg"
                    title="Plates"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div className="wrapper-content mt-[90px] flex flex-col lg:flex-row text-center items-center lg:text-left gap-[50px] justify-between lg:items-start">
              <div className="text flex flex-col gap-[26px]">
                <p className="leading-[36px] font-[700] text-[29px] lg:w-[50%]">
                  Hand Grafted Pottery since 1990
                </p>
                <p className="leading-[24px] text-[#6C6C6C] dark:text-[#fff]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum. Duis cursus, mi
                  quis viverra ornare, eros dolor interdum nulla, ut commodo
                  diam libero vitae erat. Aenean faucibus nibh et justo cursus
                  id rutrum lorem imperdiet. Nunc ut sem vitae risus posuere.
                </p>
              </div>
              <div className="text flex flex-col gap-[26px]">
                <p className="leading-[36px] font-[700] text-[29px] lg:w-[60%]">
                  We Provide Premium Pottery Produts
                </p>
                <p className="leading-[24px] text-[#6C6C6C] dark:text-[#fff]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum. Duis cursus, mi
                  quis viverra ornare, eros dolor interdum nulla, ut commodo
                  diam libero vitae erat. Aenean faucibus nibh et justo cursus
                  id rutrum lorem imperdiet. Nunc ut sem vitae risus posuere.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Section 4 */}
        <div className="wrapper-gold-pottery py-[60px] border-y-[1px] border-[#d4d4d4] dark:border-[#333333]">
          <div className="container">
            <div className="wrapper-content flex flex-col gap-[50px] lg:flex-row flex-wrap  justify-between items-center lg:gap-[20px]">
              <div className="post lg:w-[30%]">
                <div className="wrapper-image">
                  <img src="src/assets/pottery-gold.svg" alt="" />
                </div>
              </div>
              <div className="post lg:w-[60%] ">
                <div className="wrapper-text flex flex-col gap-[25px] text-center lg:text-left">
                  <p className="text-[24px] leading-[34px] font-[700]">
                    Gold & Black Pottery
                  </p>
                  <p className="leading-[24px] text-[#6C6C6C] dark:text-[#fff]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit sed
                    do eiusmod tempor incididunt ut labore dolore aua. Ut enim
                    ad minim veniam, quis nostrud exercitationulco laboris nisi
                    ut aliquip ex ea commodo consequatuisaute.
                  </p>
                  <p className="leading-[24px] font-[700]">View Details</p>
                </div>
              </div>
              <div className="post lg:w-[60%] ">
                <div className="wrapper-text flex flex-col gap-[25px] text-center lg:text-left">
                  <p className="text-[24px] leading-[34px] font-[700]">
                    Orange Ceramic
                  </p>
                  <p className="leading-[24px] text-[#6C6C6C] dark:text-[#fff]">
                    Pri cu dico labores officiis, odio principes complectitur ad
                    sea. Sea id doctus forensibus, nec lorem vocent aliquam eu.
                    Aliquid definitiones id cum, ad meliore perpetua referrentur
                    sed. Quas suscipit ad mea verear vivendo tincidunt.
                  </p>
                  <p className="leading-[24px]  font-[700]">View Details</p>
                </div>
              </div>
              <div className="post lg:w-[30%]">
                <div className="wrapper-image">
                  <img src="src/assets/orange-ceramic.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Temp Section ToDo List */}
        <div className="wrapper-pottery-collection py-[60px] lg:py-[120px]">
          <div className="container">
            <div className="wrapper-text flex flex-col gap-[17px] text-center">
              <p className="text-[#D77474] font-[700] uppercase tracking-[2px]">
                Our online store
              </p>
              <p className="text-[40px] font-[700] leading-[50px]">
                Pottery Collection
              </p>
            </div>

            <div className="wrapper-todo mt-[60px]">
              <div className="wrapper-add-search flex gap-[20px] lg:gap-[0px] flex-col lg:flex-row items-center justify-between">
                <p className="font-[500] text-[30px]">TODO LIST</p>
                <TextField
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    getSearch(event.target.value);
                  }}
                  className="w-[100%] lg:w-[60%] dark:bg-[#fff] rounded-[5px]"
                  label="Search..."
                />
                <Button
                  className="w-[100%] lg:w-[auto]"
                  onClick={() => setModalAdd(true)}
                  variant="contained"
                  sx={{ minHeight: "56px", padding: "0 20px" }}
                >
                  Добавить
                </Button>
              </div>
              <div className="wrapper-post flex flex-col lg:flex-row items-center justify-between py-[50px] gap-[18.8px] flex-wrap">
                {data.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`post flex flex-col items-start lg:w-[31.5%] bg-[#fff] border-b-[1px] border-[#DBDBDB]
                    ${item.isComplete ? "opacity-[50%]" : "opacity-[100%]"}
                    `}
                    >
                      <div className="wrapper-image w-[100%]">
                        <img src={item.image} alt="" className="w-[100%]" />
                      </div>
                      <div className="wrapper-text flex flex-col gap-[10px] p-[20px]">
                        <p
                          className={`font-[400] text-[16px] text-[#6C6C6C] dark:text-[#6C6C6C]
                        ${item.isComplete ? "line-through" : "none"}
                        `}
                        >
                          {item.title}
                        </p>
                        <p
                          className={`text-[14px] text-[#000000]
                           ${item.isComplete ? "line-through" : "none"}
                      `}
                        >
                          {item.desc}
                        </p>
                        <div className="panel-control flex gap-[25px] mt-[15px]">
                          <Button
                            onClick={() => {
                              editInput(item, item.id);
                            }}
                            sx={{ minWidth: "24px", minHeight: "24px" }}
                          >
                            <EditIcon />
                          </Button>
                          <Button sx={{ minWidth: "24px", minHeight: "24px" }}>
                            <input
                              onChange={() => putComplete(item)}
                              type="checkbox"
                              className="w-[24px] h-[24px] cursor-pointer"
                            />
                          </Button>
                          <Button
                            onClick={() => deleteData(item.id)}
                            sx={{ minWidth: "24px", minHeight: "24px" }}
                          >
                            <DeleteIcon className="text-[#de3535]" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#AC1313",
                borderRadius: "0px",
                padding: "20px 35px",
                display: "flex",
                justifyContent: "center",
                margin: "0 auto",
                ":hover": {
                  backgroundColor: "#AC1313",
                },
              }}
            >
              View All Products
            </Button>
          </div>
        </div>
        {/* Section 6 */}
        <div className="wrapper-pompeo bg-[url(src/assets/pompeo-bg.jpg)] bg-no-repeat bg-center py-[120px] bg-cover dark:bg-[url(src/assets/pompeo-bg-dark.jpg)]">
          <div className="container">
            <div className="wrapper-text flex flex-col items-center text-center lg:text-left lg:items-start ">
              <p className="uppercase tracking-[2px] text-[#D77474] dark:text-[#fff]">
                Pompeo POttery
              </p>
              <p className="text-[36px] font-[700] leading-[46px] mt-[7px]">
                Ready to start shopping?
              </p>
              <p className="text-[16px] leading-[24px] text-[#fff] font-[600] lg:font-[400] lg:text-[#6C6C6C] mt-[13px] mb-[30px] lg:w-[36%] dark:text-[#fff]">
                Lorem ipsum dolor sit amet,{" "}
                <span className="text-[#AC1313] underline font-[700] dark:text-[#ffffff]">
                  <a href="">consectetur adipiscing elit. </a>
                </span>
                Suspendisse varius enim in eros elementum.
              </p>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#AC1313",
                  borderRadius: "0px",
                  padding: "20px 35px",
                  ":hover": {
                    backgroundColor: "#AC1313",
                  },
                }}
              >
                New Collection
              </Button>
            </div>
          </div>
        </div>
        {/* Section 7 */}
        <div className="wrapper-updates py-[125px]">
          <div className="container">
            <div className="wrapper-content flex flex-col gap-[30px] justify-center items-center">
              <div className="wrapper-image">
                <img src="src/assets/update-telegram.svg" alt="" />
              </div>
              <p className="text-[#D77474] tracking-[2px] uppercase dark:text-[#fff]">
                Latest news
              </p>
              <div className="text-image flex flex-col lg:flex-row items-center  lg:items-start">
                <p className="text-[40px] font-[400]">Latest news</p>
                <img src="src/assets/porcelain-icon.svg" alt="" />
                <p className="text-[40px] font-[400]">New updates</p>
              </div>
              <div className="wrapper-button flex flex-col items-center justify-center mx-auto gap-[40px] w-[100%]">
                <div className="btn-input flex flex-col lg:border-none lg:flex-row justify-center items-start lg:w-[33%] gap-[4px]">
                  <TextField
                    label="Enter your email"
                    className="w-[100%] bg-[#fff]"
                  />
                  <Button
                    className="w-[100%] lg:w-[auto]"
                    variant="contained"
                    sx={{
                      backgroundColor: "#000000",
                      borderRadius: "5px",
                      minHeight: "56px",
                      fontSize: "14px",
                      fontWeight: "400",
                      padding: "0px 40px",
                      backgroundColor: "#2758a6",
                      ":hover": {
                        backgroundColor: "#000000",
                      },
                    }}
                  >
                    SUBSCRIBE
                  </Button>
                </div>
                <Button
                  sx={{
                    textTransform: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    fontWeight: "400",
                  }}
                >
                  <div className="line h-[13px] w-[13px] bg-[#8534FF]"></div>
                  <p className="text-[#A1A1A1]">Sign up for our newsletter</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Section 8 */}
        <footer>
          <div className="footer-top py-[90px] border-y-[1px] border-[#e6e6e6] bg-[#DBDBDB1A] dark:border-[#333333] dark:bg-[#070914]">
            <div className="container">
              <div className="wrapper-text flex flex-col justify-center items-center mx-auto gap-[30px]">
                <a href="">
                  <Button>
                    <img
                      src="src/assets/logo-header.svg"
                      alt=""
                      className=" dark:hidden"
                    />
                    <img
                      src="src/assets/logo-header-dark.svg"
                      alt=""
                      className="dark:inline hidden"
                    />
                  </Button>
                </a>
                <p className="text-[14px] leading-[24px] text-center text-[#6C6C6C] lg:w-[30%] dark:text-[#929292]">
                  I have always striven to fix beauty in wood, stone, glass or
                  pottery, that has been my creed.
                </p>
              </div>
              <div className="wrapper-post mt-[60px] flex flex-col lg:flex-row gap-[50px] lg:gap-[0px] justify-between items-center lg:items-start flex-wrap">
                <FooterFeedback
                  image="src/assets/footer-feedback-1.svg"
                  title="EMAIL"
                  desc="pompeopotery@gmail.com"
                />
                <FooterFeedback
                  image="src/assets/footer-feedback-2.svg"
                  title="FIND"
                  desc="Central Park, Manhattan New York, 1101"
                />
                <FooterFeedback
                  image="src/assets/footer-feedback-3.svg"
                  title="CALL"
                  desc="+1 292 345 678"
                />
              </div>
            </div>
          </div>
          <div className="footer-bottom py-[31px] bg-[#DBDBDB1A] dark:bg-[#070914]">
            <div className="container">
              <div className="wrapper-text text-center">
                <p className="text-[14px]">
                  <span className="text-[#6C6C6C]">Template design by</span>{" "}
                  <a href="">Dorian Hoxha - Image License Info </a>
                  <span className="text-[#6C6C6C]">Powered by </span>
                  <a href=""> Webflow</a>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
      {/* Modal Add */}
      <ModalAdd
        modalAdd={modalAdd}
        setModalAdd={setModalAdd}
        imageAdd={imageAdd}
        setImageAdd={setImageAdd}
        setTitleAdd={setTitleAdd}
        setDescAdd={setDescAdd}
        postData={postData}
      />
      {/* Modal Edit */}
      <ModalEdit
        modalEdit={modalEdit}
        setModalEdit={setModalEdit}
        imageEdit={imageEdit}
        titleEdit={titleEdit}
        descEdit={descEdit}
        setImageEdit={setImageEdit}
        setTitleEdit={setTitleEdit}
        setDescEdit={setDescEdit}
        putSave={putSave}
      />
    </>
  );
}

export default App;
