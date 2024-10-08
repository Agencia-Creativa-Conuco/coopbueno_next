"use client";
import Link from "next/link";
import React from "react";
import styles from "./page.module.scss";
import { Sucursal } from "@/gql/graphql";
import { sendEvent } from "@/lib/api";

interface ReadMoreProps {
  sucursal: Sucursal;
  children: any;
}

const ReadMore = ({ sucursal, children }: ReadMoreProps) => {
  return (
    <Link
      className={styles.readMore}
      href={sucursal.ubicacion ?? ""}
      onClick={() => {
        sendEvent("FindLocation", true, {});
      }}
    >
      {children}
    </Link>
  );
};

export default ReadMore;
