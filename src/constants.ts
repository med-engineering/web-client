import {
  faEye,
  faScrewdriver,
  faTags,
  faCheckSquare,
  faUsers,
  faCalendarAlt,
  faTasks,
  IconDefinition,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

type SidebarOption = {
  name: string;
  icon: IconDefinition;
  route: string;
};

const sidebarOptions: SidebarOption[] = [
  {
    name: "Overview",
    icon: faEye,
    route: `/dashboard/service/:serviceID:`,
  },
  // {
  //   name: "News",
  //   icon: faNewspaper,
  //   route: "/dashboard/news",
  // },
  {
    name: "Rooms",
    icon: faScrewdriver,
    route: "/dashboard/service/:serviceID:/equipments",
  },
  {
    name: "Tags",
    icon: faTags,
    route: "/dashboard/service/:serviceID:/tags",
  },
  {
    name: "Check list",
    icon: faCheckSquare,
    route: "/dashboard/service/:serviceID:/checklist",
  },
  {
    name: "colleagues",
    icon: faUsers,
    route: "/dashboard/service/:serviceID:/colleagues",
  },
  {
    name: "Calendar",
    icon: faCalendarAlt,
    route: "/dashboard/service/:serviceID:/calendar",
  },
  {
    name: "Settings",
    icon: faGear,
    route: "/dashboard/service/:serviceID:/settings",
  },
];

export { sidebarOptions };
