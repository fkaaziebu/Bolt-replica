import React, { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  LayoutSidebarInsetReverse,
  LayoutSidebarInset,
  FileEarmarkPdf,
  PersonCircle,
} from "react-bootstrap-icons";

function SideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("profile");
  return (
    <div className="bg-light">
      <ProSidebar collapsed={isCollapsed} className="">
        <Menu iconShape="square" className="bg-light">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={
              isCollapsed ? (
                <LayoutSidebarInsetReverse
                  size={40}
                  className="bg-light text-primary"
                />
              ) : (
                <LayoutSidebarInset
                  size={40}
                  className="bg-light text-primary"
                />
              )
            }
            className="mt-1 mb-2"
          >
            {!isCollapsed && <h1 className="text-primary">Profile</h1>}
          </MenuItem>

          <div className={isCollapsed ? undefined : "ps-4"}>
            <MenuItem
              active={selected === "profile"}
              style={{ color: "#e0e0e0" }}
              // className="d-flex align-items-center"
              className={
                selected === "profile"
                  ? "d-flex align-items-center bg-primary rounded-5"
                  : "d-flex align-items-center"
              }
              onClick={() => setSelected("profile")}
              icon={
                <PersonCircle
                  className={
                    selected === "profile"
                      ? "bg-primary text-light"
                      : "bg-light text-primary"
                  }
                  size={40}
                />
              }
            >
              {!isCollapsed && (
                <h3
                  className={
                    selected === "profile"
                      ? "p-0 m-0 text-light"
                      : "p-0 m-0 text-primary"
                  }
                >
                  Profile
                </h3>
              )}
            </MenuItem>

            <MenuItem
              active={selected === "documents"}
              style={{ color: "#e0e0e0" }}
              className={
                selected === "documents"
                  ? "d-flex align-items-center bg-primary rounded-5"
                  : "d-flex align-items-center"
              }
              onClick={() => setSelected("documents")}
              icon={
                <FileEarmarkPdf
                  className={
                    selected === "documents"
                      ? "bg-primary text-light"
                      : "bg-light text-primary"
                  }
                  size={40}
                />
              }
            >
              {!isCollapsed && (
                <h3
                  className={
                    selected === "documents"
                      ? "p-0 m-0 text-light"
                      : "p-0 m-0 text-primary"
                  }
                >
                  Documents
                </h3>
              )}
            </MenuItem>

            <MenuItem
              active={selected === "rides"}
              style={{ color: "#e0e0e0" }}
              className={
                selected === "rides"
                  ? "d-flex align-items-center bg-primary rounded-5"
                  : "d-flex align-items-center"
              }
              onClick={() => setSelected("rides")}
              icon={
                <FileEarmarkPdf
                  className={
                    selected === "rides"
                      ? "bg-primary text-light"
                      : "bg-light text-primary"
                  }
                  size={40}
                />
              }
            >
              {!isCollapsed && (
                <h3
                  className={
                    selected === "rides"
                      ? "p-0 m-0 text-light"
                      : "p-0 m-0 text-primary"
                  }
                >
                  My Rides
                </h3>
              )}
            </MenuItem>
          </div>
        </Menu>
      </ProSidebar>
    </div>
  );
}

export default SideBar;
