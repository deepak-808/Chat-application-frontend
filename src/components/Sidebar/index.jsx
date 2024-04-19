import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineCreditCard, MdOutlineDirectionsCar, MdOutlineSpaceDashboard } from "react-icons/md";
import { Accordion, AccordionSummary, AccordionDetails, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "./Sidebar.scss";

const sidebarItems = [
  { to: "/dashboard", Icon: MdOutlineSpaceDashboard, text: "Dashboard" },
  {
    to: "cars", text: "Car",
    submenu: [
      { to: "/cars", text: "Brand" },
      { to: "/car/model", text: "Model" },
      { to: "/car/fuels-type", text: "Fuel Type" },
      { to: "/car/categories", text: "Categories" },
    ],
    Icon: MdOutlineDirectionsCar,
  },
  {to: "/payment", text: "Payment", Icon: MdOutlineCreditCard}
];

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="scroll-sidebar">
        <ul className="list-unstyled sidebarnav">
          {sidebarItems.map((item, index) => (
            <li className="sidebar-item" key={index}>
              {item.submenu ? (
                <div>
                  <Accordion style={{boxShadow: 'none'}}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ display: 'flex',alignItems: 'center', gap: 6, margin: 0, minHeight: 'auto'}}
                    >
                      <Box style={{ display: 'flex',alignItems: 'center', gap: 6}}>
                      <item.Icon /> {item.text}
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 0}}>
                    {item.submenu.map((subitem, subindex) => (
                        <NavLink className="sidebar-link" style={{ paddingLeft: 30}} key={subindex} to={subitem.to}>{subitem.text}</NavLink >
                    ))}
                    </AccordionDetails>
                  </Accordion>
                </div>
              ) : (
                <NavLink className="sidebar-link" to={item.to}>
                  <item.Icon /> {item.text}
                </NavLink>
              )}
            </li>
          ))}
          <li className="list-divider"></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
