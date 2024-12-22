
import { GoFileMedia } from "react-icons/go";
import { RiVipDiamondFill } from "react-icons/ri";
import { GiEngagementRing } from "react-icons/gi";
import { FaChromecast } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { ImLibrary } from "react-icons/im";
import { CgMenuGridR } from "react-icons/cg";
import { GiBoxUnpacking } from "react-icons/gi";
import { RiLogoutCircleRLine } from "react-icons/ri";
export const logo = 'https://png.pngtree.com/template/20190613/ourmid/pngtree-logo-with-movie-camera-and-tripod-you-can-use-for-logo-image_211693.jpg';

export const menus = [
    {
        id: 1,
        title: "Media Management",
        icon: <GoFileMedia />,
        items: [
            {
                id: 1,
                title: "Movies",
                path: "media_management/Movie"
            },
            {
                id: 2,
                title: "Episodes",
                path: "media_management/Episode"
            },
            {
                id: 3,
                title: "Trailer",
                path: "media_management/Trailer"
            }
        ]
    },
    {
        id: 2,
        title: "Vip",
        icon: <RiVipDiamondFill />,
        items: [
            {
                id: 1,
                title: "Package",
                path: "vip/Package"
            },
            {
                id: 2,
                title: "Peature",
                path: "vip/Peature"
            },
            {
                id: 3,
                title: "Plans",
                path: "vip/Plans"
            }
        ]
    },
    {
        id: 3,
        title: "Engagement Pages",
        icon: <GiEngagementRing />,
        items: [
            {
                id: 1,
                title: "Like ",
                path: "engagement_pages/Like"
            },
            {
                id: 2,
                title: "Watchlist ",
                path: "engagement_pages/Watchlist  "
            },
            {
                id: 3,
                title: "Comment",
                path: "engagement_pages/Comment "
            }
        ]
    },
    {
        id: 4,
        title: "Cast & Crew",
        icon: <FaChromecast />,
        items: [
            {
                id: 1,
                title: "Author",
                path: "cast_crew/Author"
            },
            {
                id: 2,
                title: "Charactor",
                path: "cast_crew/Character"
            },
            {
                id: 3,
                title: "Actor",
                path: "cast_crew/Actor"
            }
        ]
    }

];
export const ROLES = {
    ADMIN: 'admin',        // Quản trị viên cấp cao
    MODERATOR: 'moderator', // Quản trị viên cấp trung (người kiểm duyệt)
    USER: 'user',          // Người dùng thông thường
};

export const menuItems = [
    { to: "info", icon: <FaUser size={20} />, label: "Account" },
    { to: "library", icon: <ImLibrary size={20} />, label: "Movie Library Management" },
    { to: "subscription", icon: <CgMenuGridR size={20} />, label: "Subscription Plan Management" },
    { to: "offer", icon: <GiBoxUnpacking size={20} />, label: "Your Offer" },
    { to: "", icon: <RiLogoutCircleRLine size={20} />, label: "Log Out" },
];
export const initialOptions = {
    "client-id": "Acj8YVrqrM-coMhVPYhRdVa5Co3IV2774Pkk7oSagwpGtywsxvW7kcfwfpeiddAKtIHgfxVtMDkl6Qay",
    currency: "USD",
    intent: "capture"
  };