import { FaBookOpen, FaClock, FaMoon, FaPray, FaRunning, FaUsers, FaUtensils } from "react-icons/fa";

export const cardData = [
    { to: "/bangun-pagi", title: "Bangun Pagi", desk: "Pukul 04.30 - 05.00 WIB", icon: <FaClock /> },
    { to: "/beribadah", title: "Beribadah", desk: "Shalat 5 Waktu & Religiusitas", icon: <FaPray /> },
    { to: "/makan-sehat", title: "Makan Sehat", desk: "Nutrisi & Pertumbuhan", icon: <FaUtensils /> },
    { to: "/gemar-belajar", title: "Gemar Belajar", desk: "Literasi 30-60 Menit", icon: <FaBookOpen /> },
    { to: "/berolahraga", title: "Berolahraga", desk: "Aktivitas Fisik 30 Menit", icon: <FaRunning /> },
    { to: "/bermasyarakat", title: "Bermasyarakat", desk: "Sosial & Empati", icon: <FaUsers /> },
    { to: "/tidur-cepat", title: "Tidur Cepat", desk: "Pukul 20.00 - 21.00 WIB", icon: <FaMoon /> },
  ];