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
  matching?: "start" | "full";
};

const sidebarOptions: SidebarOption[] = [
  {
    name: "Overview",
    icon: faEye,
    route: `/dashboard/services/:serviceID:`,
  },
  // {
  //   name: "News",
  //   icon: faNewspaper,
  //   route: "/dashboard/news",
  // },
  {
    name: "Rooms",
    icon: faScrewdriver,
    route: "/dashboard/services/:serviceID:/rooms",
    matching: "start",
  },
  {
    name: "Tags",
    icon: faTags,
    route: "/dashboard/services/:serviceID:/tags",
  },
  {
    name: "Check list",
    icon: faCheckSquare,
    route: "/dashboard/services/:serviceID:/checklist",
  },
  {
    name: "colleagues",
    icon: faUsers,
    route: "/dashboard/services/:serviceID:/colleagues",
  },
  {
    name: "Calendar",
    icon: faCalendarAlt,
    route: "/dashboard/services/:serviceID:/calendar",
  },
  {
    name: "Settings",
    icon: faGear,
    route: "/dashboard/services/:serviceID:/settings",
  },
];







export { sidebarOptions };
