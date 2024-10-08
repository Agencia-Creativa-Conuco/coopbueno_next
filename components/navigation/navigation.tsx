"use client";

import React from "react";
import NavList from "./nav-list";
import { MenuItem } from "@/lib/auxiliar";
import styles from "./navigation.module.scss";
/**
 * Navigation Component
 *
 * It renders the navigation links
 */

interface NavigationProps {
  items?: MenuItem[] | any[];
  split?: boolean;
  isMain?: boolean;
  color?: string;
  bgColor?: string;
  borderColor?: string;
}

const Navigation = ({
  items = [],
  split = false,
  isMain = true,
  color,
  bgColor,
  borderColor,
  ...props
}: NavigationProps) => {
  return items.length ? (
    <div className={styles.menu} {...props}>
      <div className={`${styles.container} ${split ? "split" : ""}`}>
        {!split ? (
          <div className={styles.block}>
            <>
              <NavList
                items={items}
                isMain={isMain}
                color={color}
                bgColor={bgColor}
                borderColor={borderColor}
              />
            </>
          </div>
        ) : (
          items.map((el, index) => {
            const item = el.item;
            const children = el.children;
            return children ? (
              <div key={index} className={styles.block}>
                <span className={styles.label}>{item?.attributes?.title}</span>

                <NavList
                  items={children}
                  isMain={isMain}
                  color={color}
                  bgColor={bgColor}
                  borderColor={borderColor}
                />
              </div>
            ) : null;
          })
        )}
      </div>
    </div>
  ) : null;
};

export default Navigation;
