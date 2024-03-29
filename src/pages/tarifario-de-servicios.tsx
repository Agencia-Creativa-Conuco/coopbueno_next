import React, { Suspense } from "react";
import styled from "@emotion/styled";
import { container, mq } from "components/grid";
import PageHeader from "components/PageHeader";
import { h3 } from "styles/tipography";

import { GetStaticProps } from "next";

import {
  useQuery,
  prepareReactRender,
  useHydrateCache,
  Servicio,
} from "client";
import { PropsWithServerCache } from "@gqty/react";
import Layout from "components/Layout";
import Loading from "components/loading";
import { NextSeo } from "next-seo";
import { SITE_NAME, SITE_URL } from "lib/constants";

type PageProps = PropsWithServerCache<{}>;
const Page = ({ cacheSnapshot }: PageProps) => {
  useHydrateCache({
    cacheSnapshot,
  });

  const query = useQuery();
  const servicios = query.servicios({
    pagination: {
      pageSize: 100,
    },
  })?.data;

  return servicios?.length ? (
    <Suspense fallback={<Loading full />}>
      <NextSeo
        title="Tarifario de servicios"
        description="Conoce las tarifas de nuestros servicios"
        openGraph={{
          url: `${SITE_URL}`,
          title: "Tarifario de servicios",
          description: "Conoce las tarifas de nuestros servicios",
          site_name: SITE_NAME,
        }}
      />
      <Layout>
        <Section space>
          <PageHeader title={"Tarifario de servicios"} />
          <Services>
            {servicios.map((item, index) => {
              const service = item.attributes;
              const rates = service?.tarifario?.tarifas();
              const nota = service?.tarifario?.nota;

              return rates?.length ? (
                <Service
                  key={index}
                  //   order={parseInt(service.meta_box['rate-order'])}
                >
                  <ServiceName>{service?.nombre}</ServiceName>
                  <Table>
                    <TBody>
                      {rates.map((item, index) => {
                        return (
                          <Tr key={index}>
                            <Td>{item?.nombre}</Td>
                            <Td>{item?.valor}</Td>
                          </Tr>
                        );
                      })}
                    </TBody>
                  </Table>
                  {nota && <Note>{nota}</Note>}
                </Service>
              ) : null;
            })}
          </Services>
        </Section>
      </Layout>
    </Suspense>
  ) : null;
};

export default Page;

export const getStaticProps: GetStaticProps<PageProps> = async (_ctx: any) => {
  const { cacheSnapshot } = await prepareReactRender(<Page />);

  return {
    props: { cacheSnapshot },
  };
};

const Section = styled.section`
  ${container}
`;

const Services = styled.div`
  display: grid;
  gap: 3rem;
  grid-template-columns: 1fr;
  ${mq.md} {
    grid-template-columns: 1fr 1fr;
  }
  ${mq.lg} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const Service = styled.div``;

const ServiceName = styled.h2`
  ${h3}
  margin-bottom: 5px;
`;

const Table = styled.table`
  margin: 0;
  border: initial;
`;

const TBody = styled.tbody``;

const Tr = styled.tr`
  &:nth-of-type(odd) {
    background-color: #f5f5f5;
  }
`;
const Td = styled.td`
  font-weight: normal;
  vertical-align: top;
  padding: 10px;
  border: initial;
  word-break: initial;
  &:first-of-type {
    font-weight: bold;
  }
`;

const Note = styled.p`
  font-style: italic;
`;
