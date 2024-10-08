// import React, { useEffect } from "react";
// import styled from "@emotion/styled";

// import { Enum_Servicio_Categoria, useQuery } from "@/gql/graphql";
// import { useRouter } from "next/router";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// interface LayoutProps {
//   children?: any;
// }

// const Layout = ({ children }: LayoutProps) => {
//   const router = useRouter();

//   useEffect(() => {
//     try {
//       window.eval(`
//         _hsq.push(["trackPageView"]);
//       `);
//     } catch (error) {
//       console.log(error);
//     }
//   }, [router]);

//   const servicios =
//     useQuery().servicios({
//       pagination: {
//         pageSize: 100,
//       },
//       filters: {
//         categoria: {
//           in: [
//             Enum_Servicio_Categoria.ahorro,
//             Enum_Servicio_Categoria.prestamos,
//             Enum_Servicio_Categoria.facilidades,
//           ],
//         },
//       },
//       sort: ["nombre:asc"],
//     })?.data || [];

//   let footerItems: any = [];
//   let headerItems: any = [];

//   const menuItems = useQuery()
//     .menusMenuItems({
//       pagination: {
//         pageSize: 100,
//       },
//       filters: {
//         root_menu: {
//           slug: {
//             in: ["header", "footer"],
//           },
//         },
//       },
//       sort: ["order:asc"],
//     })
//     ?.data.map((item) => {
//       //No borrar variables sin utilizar. Se usa para GQTY
//       const url = item.attributes?.url;
//       const target = item.attributes?.target;
//       const title = item.attributes?.title;

//       if (item.attributes?.root_menu.data?.attributes?.slug === "header") {
//         headerItems.push(item);
//       } else {
//         footerItems.push(item);
//       }
//     });

//   return (
//     <>
//       <Header menuItems={headerItems} servicios={servicios} />
//       <Main>
//         {React.Children.map(children, (child) => {
//           if (React.isValidElement(child)) {
//             return React.cloneElement(child, {
//               // ...{ resultsSearch, setResultsSearch },
//             });
//           }
//           return child;
//         })}
//       </Main>
//       <Footer menuItems={footerItems} />
//     </>
//   );
// };

// export default Layout;

// const Main = styled.main`
//   overflow: hidden;
//   min-height: 100vh;
// `;
