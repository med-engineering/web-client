import {
    faEye,
    faScrewdriver,
    faTags,
    faCheckSquare,
    faUsers,
    faCalendarAlt,
    faTasks,
    IconDefinition,
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
      route: "/dashboard",
    },
    // {
    //   name: "News",
    //   icon: faNewspaper,
    //   route: "/dashboard/news",
    // },
    {
      name: "Equipements",
      icon: faScrewdriver,
      route: "/dashboard/equipements",
    },
    {
      name: "Tags",
      icon: faTags,
      route: "/dashboard/tags",
    },
    {
      name: "Check list",
      icon: faCheckSquare,
      route: "/dashboard/checklist",
    },
    {
      name: "colleagues",
      icon: faUsers,
      route: "/dashboard/colleagues",
    },
    {
      name: "Calendar",
      icon: faCalendarAlt,
      route: "/dashboard/calendar",
    },
    {
      name: "My activities",
      icon: faTasks,
      route: "/dashboard/activities",
    },
  ];
  
  export { sidebarOptions };
  