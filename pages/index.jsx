/* 
BE CHÍ CỐT — Microsite (Next.js + Tailwind)
Version: 2025
*/

import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";

// COMPONENT: Một ô lịch trình có thể bấm để chỉnh
function EditableTask({ task, onSelect }) {
  return (
    <button
      onClick={() => onSelect(task)}
      className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-yellow-100 rounded-lg shadow-sm border border-gray-200 transition"
    >
      <p className="text-sm text-gray-600">{task.time}</p>
      <p className="font-medium text-gray-800">{task.title}</p>
    </button>
  );
}

// COMPONENT: Popup chọn gợi ý thay thế
function SuggestModal({ task, onChoose, onClose, timetableVersion }) {
  if (!task) return null;

  // ==============================
  // 🟡 GỢI Ý CHO svtkb1goiy
  // ==============================
  const alternatives1 = {
    "Anh Kiên Be ship bánh mì Hội An": [
      "Anh Kiên Be ship bánh bao",
      "Anh Kiên Be ship xôi xéo",
      "Anh Kiên Be ship cháo sườn",
    ],
    "Anh Thiên Be ship bún chả bà Dung": [
      "Anh Thiên Be ship bún mắm Đà Nẵng",
      "Anh Thiên Be ship bánh canh cua Sài Gòn",
      "Anh Thiên Be ship bún hải sản",
    ],
    "Anh Đức Be giao hợp đồng cho đối tác": [
      "Anh Đức Be giao quà cho đối tác",
      "Anh Đức Be giao hàng cho khách",
      "Anh Đức Be giao quà cho ngiu",
    ],
    "Anh Minh Be ship trà sữa": [
      "Anh Minh Be ship trà chanh lô hội",
      "Anh Minh Be ship chè mít",
      "Anh Minh Be ship sinh tố xoài",
    ],
  };

  // ==============================
  // 🟢 GỢI Ý CHO svtkb2goiy
  // ==============================
  const alternatives2 = {
    "Anh Phúc Be giao bánh bao trứng muối": [
      "Anh Phúc Be giao bánh dày",
      "Anh Phúc Be giao bánh cuốn",
      "Anh Phúc Be giao bánh ướt",
    ],
    "Anh Thiện Be giao phở bò Nam Định": [
      "Anh Thiện Be giao bún riêu",
      "Anh Thiện Be giao cơm Tấm",
      "Anh Thiện Be giao mì hải sản",
    ],
    "Anh Hải Be giao Matcha Latte": [
      "Anh Hải Be giao sữa tươi trân châu đường đen",
      "Anh Hải Be giao rau má mix",
      "Anh Hải Be giao trà xoài",
    ],
  };

  // 🔵 GỢI Ý CHO ndltkb1goiy
  const alternatives3 = {
    "Anh Cường Be ship phở bò": [
      "Anh Cường Be ship bánh mì Hội An",
      "Anh Cường Be ship bánh cuốn",
      "Anh Cường Be ship xôi gà",
    ],
    "Anh Nam Be ship lẩu thái 1 người ăn": [
      "Anh Nam Be ship bún đậu mắm tôm",
      "Anh Nam Be ship bún ốc nguội",
      "Anh Nam Be ship nem chua rán",
    ],
    "Chị Lan Be ship bánh tráng trộn và trà sữa": [
      "Chị Lan Be ship bánh mì nướng muối ớt",
      "Chị Lan Be ship tàu phớ",
      "Chị Lan Be ship mì cay",
    ],
  };

  // 🔴 GỢI Ý CHO ndltkb12goiy
  const alternatives4 = {
    "Anh Minh Be ship xôi thập cẩm": [
      "Anh Minh Be ship bánh mì xíu mại",
      "Anh Minh Be ship bánh đúc nóng",
      "Anh Minh Be ship bánh ướt",
    ],
    "Anh Thiện Be ship nem nướng": [
      "Anh Thiện Be ship nem nướng Tân Việt",
      "Anh Thiện Be ship bún chả bà Dung",
      "Anh Thiện Be ship ngan cháy tỏi",
    ],
    "Anh Linh Be ship hồ sơ cho đối tác": [
      "Anh Linh Be ship thư tình cho crush",
      "Anh Linh Be ship hàng cho khách",
      "Anh Linh Be ship quà cho khách",
    ],
    "Anh Bách Be ship Starbuck": [
      "Anh Bách Be ship trà sữa thái xanh",
      "Anh Bách Be ship chè Thái",
      "Anh Bách Be ship tàu phớ",
    ],
  };

  // chọn bộ gợi ý theo version
  const alternatives =
    timetableVersion === "svtkb1goiy"
      ? alternatives1
      : timetableVersion === "svtkb2goiy"
      ? alternatives2
      : timetableVersion === "ndltkb1goiy"
      ? alternatives4
      : alternatives3;
const options = alternatives[task.title] || [];
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-80 shadow-lg text-center">
        <h3 className="font-semibold mb-2">Chọn gợi ý thay thế cho:</h3>
        <p className="text-gray-700 text-sm mb-4 italic">{task.title}</p>

        <div className="flex flex-col gap-2">
          {options.length > 0 ? (
            options.map((opt) => (
              <button
                key={opt}
                onClick={() => onChoose(task, opt)}
                className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 rounded transition"
              >
                {opt}
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm">(Không có gợi ý thay thế)</p>
          )}
        </div>

        <button onClick={onClose} className="mt-4 text-sm text-gray-500">
          Đóng
        </button>
      </div>
    </div>
  );
}

// 🧭 FULL TIMETABLES (4 BẢN)

// 1️⃣ Sinh viên - Gợi ý 1
const fullTimetableStudent1 = [
  { id: 1, time: "06:30", title: "Anh Sơn Be chở đi học", editable: false },
  { id: 2, time: "07:00", title: "Anh Kiên Be ship bánh mì Hội An", editable: true },
  { id: 3, time: "07:30", title: "Đi học ở trường", editable: false },
  { id: 4, time: "11:30", title: "Anh Thiên Be ship bún chả bà Dung", editable: true },
  { id: 5, time: "12:00", title: "Anh Ngọc Be chở đến công ty", editable: false },
  { id: 6, time: "13:00", title: "Đi thực tập ở công ty", editable: false },
  { id: 7, time: "15:00", title: "Anh Đức Be giao hợp đồng cho đối tác", editable: true },
  { id: 8, time: "17:30", title: "Anh Mỹ Be chở về nhà", editable: false },
  { id: 9, time: "18:30", title: "Tắm rửa", editable: false },
  { id: 10, time: "19:00", title: "Chị Mỹ Be dọn phòng", editable: false },
  { id: 11, time: "19:30", title: "Ăn tối tại nhà", editable: false },
  { id: 12, time: "20:00", title: "Chạy deadline", editable: false },
  { id: 13, time: "20:30", title: "Anh Minh Be ship trà sữa", editable: true },
];

// 2️⃣ Sinh viên - Gợi ý 2
const fullTimetableStudent2 = [
  { id: 1, time: "08:00", title: "Anh Phúc Be giao bánh bao trứng muối", editable: true },
  { id: 2, time: "08:30", title: "Ăn sáng", editable: false },
  { id: 3, time: "09:00", title: "Dạy thêm IELTS", editable: false },
  { id: 4, time: "10:30", title: "Anh Thiện Be giao phở bò Nam Định", editable: true },
  { id: 5, time: "11:00", title: "Ăn trưa", editable: false },
  { id: 6, time: "11:30", title: "Anh Tin Be chở đi học", editable: false },
  { id: 7, time: "12:00", title: "Học ở trường", editable: false },
  { id: 8, time: "15:00", title: "Anh Hải Be giao Matcha Latte", editable: true },
  { id: 9, time: "17:00", title: "Anh Nam Be chở về trọ", editable: false },
  { id: 10, time: "18:00", title: "Tắm rửa, Make up", editable: false },
  { id: 11, time: "19:00", title: "Đi chơi, Bonding cùng bạn bè", editable: false },
  { id: 12, time: "22:30", title: "Anh Sinh Be - BUTL chở về nhà", editable: false },
];

// 3️⃣ Người đi làm - Gợi ý 1
const fullTimetableWorker1 = [
  { id: 1, time: "08:30", title: "Anh Cường Be ship phở bò", editable: true },
  { id: 2, time: "09:00", title: "Làm việc Freelance", editable: false },
  { id: 3, time: "12:00", title: "Anh Nam Be ship lẩu thái 1 người ăn", editable: true },
  { id: 4, time: "13:00", title: "Nghỉ trưa", editable: false },
  { id: 5, time: "14:00", title: "Anh Tiến Be chở đến văn phòng đối tác", editable: false },
  { id: 6, time: "15:00", title: "Gặp mặt đối tác", editable: false },
  { id: 7, time: "16:30", title: "Anh Kiên Be chở ra sân bóng gần nhà", editable: false },
  { id: 8, time: "17:00", title: "Chị Ngân Be dọn phòng, Chơ Pickle Ball", editable: false },
  { id: 9, time: "18:00", title: "Ăn tối tại nhà", editable: false },
  { id: 10, time: "19:30", title: "Tắm rửa", editable: false },
  { id: 11, time: "20:00", title: "Chạy nốt deadline Freelance", editable: false },
  { id: 12, time: "21:00", title: "Chị Lan Be ship bánh tráng trộn và trà sữa", editable: true },
];

// 4️⃣ Người đi làm - Gợi ý 2
const fullTimetableWorker2 = [
  { id: 1, time: "06:30", title: "Đi xe đến chỗ làm", editable: false },
  { id: 2, time: "07:00", title: "Anh Minh Be ship xôi thập cẩm", editable: true },
  { id: 3, time: "08:00", title: "Đi làm ở công ty", editable: false },
  { id: 4, time: "12:00", title: "Anh Thiện Be ship nem nướng", editable: true },
  { id: 5, time: "13:00", title: "Đi làm ở công ty", editable: false },
  { id: 6, time: "14:00", title: "Anh Linh Be ship hồ sơ cho đối tác", editable: true },
  { id: 7, time: "16:00", title: "Anh Bách Be ship Starbuck", editable: true },
  { id: 8, time: "18:30", title: "Ăn tối với đồng nghiệp", editable: false },
  { id: 9, time: "19:00", title: "Anh Khánh Be - BUTL chở về nhà", editable: false },
  { id: 10, time: "20:00", title: "Tắm rửa", editable: false },
  { id: 11, time: "21:30", title: "Chạy nốt Deadline", editable: false },
];

// ===============================
// MAIN COMPONENT
// ===============================
export default function BeChiCotMicrosite() {
  const [role, setRole] = useState(null);
  const [step, setStep] = useState("intro");
  const [introPage, setIntroPage] = useState(0);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  // template cho 2 timetable
  const timetableTemplate1 = [
    { id: 2, title: "Anh Kiên Be ship bánh mì Hội An", time: "07:00" },
    { id: 4, title: "Anh Thiên Be ship bún chả bà Dung", time: "11:30" },
    { id: 7, title: "Anh Đức Be giao hợp đồng cho đối tác", time: "15:00" },
    { id: 13, title: "Anh Minh Be ship trà sữa", time: "20:30" },
  ];

  const timetableTemplate2 = [
    { id: 1, title: "Anh Phúc Be giao bánh bao trứng muối", time: "08:00" },
    { id: 4, title: "Anh Thiện Be giao phở bò Nam Định", time: "10:30" },
    { id: 8, title: "Anh Hải Be giao Matcha Latte", time: "15:00" },
  ];
// 🟠 TEMPLATE CHO NGƯỜI ĐI LÀM
  const timetableTemplate3 = [
    { id: 1, title: "Anh Cường Be ship phở bò", time: "08:30" },
    { id: 3, title: "Anh Nam Be ship lẩu thái 1 người ăn", time: "12:00" },
    { id: 12, title: "Chị Lan Be ship bánh tráng trộn và trà sữa", time: "21:00" },
  ];

  const timetableTemplate4 = [
    { id: 2, title: "Anh Minh Be ship xôi thập cẩm", time: "07:00" },
    { id: 4, title: "Anh Thiện Be ship nem nướng", time: "12:00" },
    { id: 6, title: "Anh Linh Be ship hồ sơ cho đối tác", time: "14:00" },
    { id: 7, title: "Anh Bách Be ship Starbuck", time: "16:00" },
  ];
  const [editableTasks, setEditableTasks] = useState(timetableTemplate1);

  // Hàm chọn task
  const handleSelectTask = (task) => setSelectedTask(task);
  const handleChooseAlternative = (task, newTitle) => {
    setEditableTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, title: newTitle } : t))
    );
    setSelectedTask(null);
  };

  const handleFinishEditing = () => setStep("finalTimetable");
// 🎯 Chọn full timetable tương ứng với version người dùng đã chọn
let finalFullTimetable = [];
if (selectedTimetable === "svtkb1goiy") finalFullTimetable = fullTimetableStudent1;
else if (selectedTimetable === "svtkb2goiy") finalFullTimetable = fullTimetableStudent2;
else if (selectedTimetable === "ndltkb1goiy") finalFullTimetable = fullTimetableWorker2;
else if (selectedTimetable === "ndltkb2goiy") finalFullTimetable = fullTimetableWorker1;

  const [ugc, setUgc] = useState({ feelings: [], story: "", promises: [] });
function toggleFeeling(f) {
  setUgc((u) => {
    const newFeelings = u.feelings.includes(f)
      ? u.feelings.filter((x) => x !== f)
      : [...u.feelings, f];
    return { ...u, feelings: newFeelings };
  });
}

function togglePromise(p) {
  setUgc((u) => {
    const newPromises = u.promises.includes(p)
      ? u.promises.filter((x) => x !== p)
      : [...u.promises, p];
    return { ...u, promises: newPromises };
  });
}
  const feelingsOptions = [
    "Dễ thương phết chứ không đùa",
    "Có tâm hơn cả ny cũ luôn á",
    "Mượt mà, xịn xò, nói chung là “ưng cái bụng”",
    "Nói ít hiểu nhiều, chuẩn chí cốt",
    "Tưởng đâu bạn thân từ kiếp trước",
    "Giảm sức mạnh con tướng này giúp em",
    "Hiểu mình hơn cả mình, đỉnh thiệt",
    "Mượt hơn Sunsilk lun mom",
    "Tưởng toang lại hóa nhịp nhàng",
    "Tán là đổ liền luôn nè",
  ];

  const promisesOptions = [
    "Đi học/ làm đúng giờ mỗi sáng",
    "Ăn khuya sau deadline",
    "Giao thư tình cho crush",
    "Dọn nhà đón niềm vui mới",
    "Đón người yêu ở sân bay",
    "Đi du lịch cuối năm",
    "Sống sót qua mùa mưa gió",
    "Đi nhậu/bonding cuối năm",
    "Công phá 7749 trò chơi",
    "Đi dạo đêm quanh thành phố",
  ];

   function resetAll() {
    setRole(null);
    setStep("chooseRole");
    setUgc({ feelings: [], story: "", promises: [] });
  }

function drawSingleLineText(ctx, text, x, y, maxWidth, maxFontSize = 18, minFontSize = 10) {
    let fontSize = maxFontSize;
    ctx.font = `${fontSize}px Roboto`;
  
    while (ctx.measureText(text).width > maxWidth && fontSize > minFontSize) {
      fontSize -= 1;
      ctx.font = `${fontSize}px Roboto`;
    }

    ctx.fillText(text, x, y);
  }

  const generateCertificate = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    const img = new Image();
    img.src = "/cert.png";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, c.width, c.height);

      ctx.textBaseline = "top";
      ctx.fillStyle = "#000";

      const feelingsText = ugc.feelings.length > 0 ? ugc.feelings.join(", ") : "(Chưa nhập)";
      const storyText = ugc.story || "(Chưa nhập)";
      const promisesText = ugc.promises.length > 0 ? ugc.promises.join(", ") : "(Chưa nhập)";

      const textXStart = 140;
      const textWidth = 600;
      const centerX = textXStart + textWidth / 2; // = 140 + 600/2 = 440

      ctx.textAlign = "center"; // căn giữa
      ctx.textBaseline = "top"; // y là top

      drawSingleLineText(ctx, feelingsText, centerX, 360, textWidth);
      drawSingleLineText(ctx, storyText, centerX, 425, textWidth);
      drawSingleLineText(ctx, promisesText, centerX, 495, textWidth);

    };
  };

 // 1️⃣ useEffect cho certificate
useEffect(() => {
  if (step === "certificate") generateCertificate();
}, [step]);

// Khi component mount, auto play nhạc
useEffect(() => {
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
    // Sau khi user đã tương tác 1 lần, bỏ listener
    window.removeEventListener("click", playAudio);
  };

  // Lắng nghe 1 click đầu tiên
  window.addEventListener("click", playAudio);

  return () => {
    window.removeEventListener("click", playAudio);
  };
}, []);

  // Hàm toggle nhạc
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

return (
  <>
      {/* 🌟 META TAGS CHO LINK PREVIEW */}
      <Head>
        <title>Be Chí Cốt Microsite</title>
        <meta property="og:title" content="Be Chí Cốt Microsite" />
        <meta property="og:description" content="Trải nghiệm First Date cùng Be Chí Cốt" />
        <meta property="og:image" content="https://be-chi-cot.vercel.app/Cover.png" />
        <meta property="og:url" content="https://be-chi-cot.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
  />
      </Head>
    <div className="min-h-screen bg-cover bg-center relative text-gray-800" style={{ backgroundImage: "url('/bg.png')" }}>
    {/* Nhạc nền */}
    <audio ref={audioRef} src="/bgmusic.mp3" loop />

    {/* Nút bật/tắt nhạc */}
    <button
      onClick={toggleAudio}
      className="fixed top-4 right-4 px-3 py-1 bg-yellow-500 text-white rounded shadow"
    >
      {isPlaying ? "Tắt nhạc" : "Bật nhạc"}
    </button>

{/* STEP 0: INTRO + COVER */}
{step === "intro" && (
  <div
    className="relative w-screen h-screen flex flex-col items-center justify-end overflow-hidden"
    style={{
      touchAction: "pan-y pinch-zoom", // ✅ Cho phép zoom bằng tay
      overflow: "auto",                // ✅ Cho phép cuộn / phóng to
    }}
  >
    {/* Ảnh nền toàn màn hình (cover + 6 intro) */}
    <img
      src={
        introPage === 0 ? "/Cover.png"
        : introPage === 1 ? "/1.png"
        : introPage === 2 ? "/2.png"
        : introPage === 3 ? "/3.png"
        : introPage === 4 ? "/4.png"
        : introPage === 5 ? "/5.png"
        : "/6.png"
      }
      alt={`Trang giới thiệu ${introPage}`}
      className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-200 ease-in-out"
    />

    {/* Nút điều hướng */}
    <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 z-10">
      {introPage < 7 ? (
        <button
          onClick={() => setIntroPage(introPage + 1)}
          className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-2xl shadow hover:scale-105 transition-transform duration-300"
        >
          Tiếp tục
        </button>
      ) : (
        <button
          onClick={() => setStep('chooseRole')}
          className="px-8 py-3 bg-yellow-600 text-white font-semibold rounded-2xl shadow hover:scale-105 transition-transform duration-300"
        >
          Bắt đầu
        </button>
      )}

      {/* (tuỳ chọn) nút bỏ qua intro */}
      {/* <button
        onClick={() => setStep('chooseRole')}
        className="mt-4 text-sm text-gray-300 underline"
      >
        Bỏ qua
      </button> */}
    </div>
  </div>
)}

{/* STEP 1 */}
{step === "chooseRole" && (
  <div className="flex flex-col items-center justify-center min-h-screen text-center">
    {/* Ảnh tiêu đề “Bạn là” */}
    <img
      src="/banla.png"
      alt="Bạn là"
      className="w-[22rem] md:w-[26rem] mb-4"
    />

    {/* Hai nút ảnh đều to và thẳng hàng */}
    <div className="flex flex-col gap-1 md:gap-2 items-center justify-center mt-2">
      <button
        onClick={() => {
          setRole("student");
          setStep("pickTimetable");
        }}
        className="w-full"
      >
        <img
          src="/sinhvien.png"
          alt="Sinh viên"
          className="w-full max-w-xl h-auto hover:scale-105 transition-transform duration-200"
        />
      </button>

      <button
        onClick={() => {
          setRole("worker");
          setStep("pickTimetable");
        }}
        className="w-full"
      >
        <img
          src="/nguoidilam.png"
          alt="Người đi làm"
          className="w-full max-w-xl h-auto hover:scale-105 transition-transform duration-200"
        />
      </button>
    </div>
  </div>
)}

{/* STEP 2 */}
  {step === "pickTimetable" && (
  <div className="flex flex-col items-center justify-center">
    <img src="/chonlichtrinh.png" className="w-[800px] mb-4" />

    {/* Nếu là SINH VIÊN */}
    {role === "student" && (
      <div className="flex gap-6">
        <button
          onClick={() => {
            setSelectedTimetable("svtkb1goiy");
            setEditableTasks(timetableTemplate1.map((t) => ({ ...t })));
            setStep("suggestTimetable");
          }}
        >
          <img src="/svtkb1.jpg" className="w-[250px] rounded-lg hover:scale-105 transition" />
        </button>
        <button
          onClick={() => {
            setSelectedTimetable("svtkb2goiy");
            setEditableTasks(timetableTemplate2.map((t) => ({ ...t })));
            setStep("suggestTimetable");
          }}
        >
          <img src="/svtkb2.jpg" className="w-[250px] rounded-lg hover:scale-105 transition" />
        </button>
      </div>
    )}

    {/* Nếu là NGƯỜI ĐI LÀM */}
    {role === "worker" && (
      <div className="flex gap-6">
        <button
          onClick={() => {
            setSelectedTimetable("ndltkb2goiy");
            setEditableTasks(timetableTemplate3.map((t) => ({ ...t })));
            setStep("suggestTimetable");
          }}
        >
          <img src="/ndltkb2.jpg" className="w-[250px] rounded-lg hover:scale-105 transition" />
        </button>
        <button
          onClick={() => {
            setSelectedTimetable("ndltkb1goiy");
            setEditableTasks(timetableTemplate4.map((t) => ({ ...t })));
            setStep("suggestTimetable");
          }}
        >
          <img src="/ndltkb1.jpg" className="w-[250px] rounded-lg hover:scale-105 transition" />
        </button>
      </div>
    )}
  </div>
)}
      {/* STEP 3 */}
      {step === "suggestTimetable" && (
        <div className="flex flex-col items-center">
          <img src="/goiy1.png" alt="Be gợi ý" className="w-[800px] mb-4" />
          <img
            src={`/${selectedTimetable || "svtkb1goiy"}.jpg`}
            className="w-[250px] rounded-lg shadow-lg mb-6"
          />
          <div className="flex gap-4">
            <button
              onClick={() => setStep("ugc")}
              className="px-4 py-2 bg-yellow-500 text-white rounded shadow"
            >
              Xác nhận
            </button>
            <button
              onClick={() => setStep("editTimetable")}
              className="px-4 py-2 bg-blue-100 rounded shadow"
            >
              Chỉnh sửa lịch trình
            </button>
          </div>
        </div>
      )}

{/* STEP 3.5 */}
{step === "editTimetable" && (
  <div
    className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6 text-center"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="flex flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">
      <img src="/tuychinh.png" className="w-[800px] mb-4" />

      <div className="grid grid-cols-1 gap-8 w-full max-w-3xl">
        {editableTasks.map((t) => (
          <EditableTask key={t.id} task={t} onSelect={handleSelectTask} />
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleFinishEditing}
          className="px-5 py-2 bg-yellow-500 text-white rounded shadow hover:scale-105 transition"
        >
          Hoàn tất & Tiếp tục
        </button>
        <button
          onClick={() => setStep("suggestTimetable")}
          className="px-5 py-2 bg-gray-300 rounded hover:scale-105 transition"
        >
          Quay lại
        </button>
      </div>

      <SuggestModal
        task={selectedTask}
        onChoose={handleChooseAlternative}
        onClose={() => setSelectedTask(null)}
        timetableVersion={selectedTimetable}
      />
    </div>
  </div>
)}

{/* STEP 3.6: FINAL TIMETABLE */}
{step === "finalTimetable" && (
  <div
    className="min-h-screen bg-cover bg-center flex justify-center items-center p-6"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="bg-white/95 shadow-lg rounded-2xl p-8 max-w-xl w-full flex flex-col items-center text-center">
      <img
        src="/lichtrinhfinal.png"
        className="w-[600px] mb-6"
        alt="Lịch trình cuối cùng"
      />

      {/* 🧭 Hiển thị full lịch (gồm cả phần fix và phần user đã sửa) */}
      <div className="divide-y divide-gray-200 w-full mb-6 rounded-lg overflow-hidden">
        {finalFullTimetable.map((task) => {
          const title =
            editableTasks.find((t) => t.id === task.id)?.title || task.title;
          return (
            <div
              key={task.id}
              className={`py-3 px-4 text-left rounded ${
                task.editable
                  ? "bg-yellow-100 border-l-4 border-yellow-400"
                  : "bg-blue-500 text-white"
              }`}
            >
              <p className="text-sm opacity-90">{task.time}</p>
              <p className="font-medium">{title}</p>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 mt-2">
        <button
          onClick={() => setStep("ugc")}
          className="px-6 py-3 bg-yellow-500 text-white rounded shadow hover:scale-105 transition"
        >
          Xác nhận & Tiếp tục
        </button>

        <button
          onClick={() => setStep("editTimetable")}
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded shadow hover:scale-105 transition"
        >
          Quay lại
        </button>
      </div>
    </div>
  </div>
)}

{/* STEP 4: UGC FORM */}
{step === "ugc" && (
  <div
    className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-8 max-w-3xl w-full text-gray-800 flex flex-col gap-4 overflow-auto">
      
      <img
        src="/chiase.png"
        alt="Chia sẻ trải nghiệm cùng Be Chí Cốt"
        className="w-[1500px] mb-4 self-center"
      />

      {/* Step 1 - Cảm nghĩ */}
      <h3 className="font-semibold mb-0">Cảm nghĩ sau buổi "First Date" cùng Be Chí Cốt</h3>
      <p className="text-sm text-gray-500 mt-1 mb-2">Chọn tối đa 2 lựa chọn bạn nhé</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
        {feelingsOptions.map((f) => (
          <label
            key={f}
            className={`p-2 border rounded cursor-pointer text-sm ${
              ugc.feelings.includes(f)
                ? "bg-yellow-100 border-yellow-400"
                : "hover:bg-gray-100"
            }`}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={ugc.feelings.includes(f)}
              onChange={() => toggleFeeling(f)}
            />
            {f}
          </label>
        ))}
      </div>

      {/* Step 2 - Kỷ niệm */}
      <h3 className="font-semibold mb-2">Kể lại kỷ niệm sau buổi "First Date" cùng Be Chí Cốt</h3>
      <textarea
        className="w-full border p-2 rounded mb-4"
        rows={3}
        value={ugc.story}
        onChange={(e) => setUgc((u) => ({ ...u, story: e.target.value }))}
        placeholder="Chia sẻ với Be nhé!"
      />

      {/* Step 3 - Hứa hẹn */}
      <h3 className="font-semibold mb-0">Hứa hẹn cho những buổi "date" tiếp theo</h3>
      <p className="text-sm text-gray-500 mt-1 mb-2">Chọn tối đa 2 lựa chọn bạn nhé</p>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-6">
        {promisesOptions.map((p) => (
          <label
            key={p}
            className={`p-2 border rounded cursor-pointer text-sm ${
              ugc.promises.includes(p)
                ? "bg-yellow-100 border-yellow-400"
                : "hover:bg-gray-100"
            }`}
          >
            <input
              type="checkbox"
              className="mr-2"
              checked={ugc.promises.includes(p)}
              onChange={() => togglePromise(p)}
            />
            {p}
          </label>
        ))}
      </div>

      {/* Nút gửi / làm lại */}
      <div className="flex justify-center gap-3">
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded hover:scale-105 transition"
          onClick={() => setStep("certificate")}
        >
          Gửi Be Chí Cốt
        </button>
        <button
          className="px-5 py-2 bg-gray-300 rounded hover:scale-105 transition"
          onClick={resetAll}
        >
          Làm lại
        </button>
      </div>
    </div>
  </div>
)}

{/* STEP 5: CERTIFICATE */}
{step === "certificate" && (
  <div
    className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center p-6"
    style={{ backgroundImage: "url('/bg.png')" }}
  >
    <div className="flex flex-col items-center bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6">

      {/* Canvas hiển thị chứng nhận */}
      <canvas
        ref={canvasRef}
        width={868}
        height={760}
        className="w-full max-w-[700px] rounded-lg shadow mb-4"
      />

      <div className="flex gap-4">
        {/* 1️⃣ Lưu về máy */}
        <button
          onClick={() => {
            const c = canvasRef.current;
            const a = document.createElement("a");
            a.href = c.toDataURL("image/png");
            a.download = "be-chi-cot-certificate.png";
            a.click();
          }}
          className="px-5 py-2 bg-yellow-500 text-white rounded shadow hover:scale-105 transition"
        >
          Lưu lại
        </button>

{/* 2️⃣ Chia sẻ Facebook */}
<button
  onClick={async () => {
    const c = canvasRef.current;
    const blob = await new Promise((resolve) => c.toBlob(resolve, "image/png"));

    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", "microsite_cert"); // preset Cloudinary

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dxrfxl6v7/image/upload",
        { method: "POST", body: formData }
      );
      const data = await res.json();

      if (data.secure_url) {
        // --- MOBILE SHARE (Web Share API) ---
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Be Chí Cốt",
              text: "Chia sẻ khoảnh khắc của bạn cùng Be Chí Cốt 💛",
              url: data.secure_url,
            });
          } catch (err) {
            console.warn("User cancelled share:", err);
          }
        } else {
          // --- FALLBACK (Desktop) ---
          const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            data.secure_url
          )}`;
          window.open(fbShareUrl, "_blank");
        }
      }
    } catch (err) {
      console.error(err);
      alert("Share thất bại");
    }
  }}
  className="px-5 py-2 bg-blue-600 text-white rounded shadow hover:scale-105 transition"
>
  Chia sẻ
</button>

        {/* 3️⃣ Làm lại */}
        <button
          onClick={resetAll}
          className="px-5 py-2 bg-gray-300 rounded shadow hover:scale-105 transition"
        >
          Làm lại
        </button>
      </div>
    </div>
  </div> 
)}
  </div> 
  </> 
); 
}
