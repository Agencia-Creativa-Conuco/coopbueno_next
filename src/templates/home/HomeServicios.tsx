import React from "react";
import styled from "@emotion/styled";
import { CarouselProvider, Slider, Dot } from "pure-react-carousel";
import ServicesCards from "./HomeServicioCard";
import { container } from "components/grid";
import { ENUM_SERVICIO_TIPO, ServicioEntity } from "client";
import colors from "styles/colors";

interface HomeServiciosProps {
  servicios?: ServicioEntity[];
}
const HomeServicios = ({ servicios = [] }: HomeServiciosProps) => {
  const mainItems = Object.values(ENUM_SERVICIO_TIPO)
    .filter((item) => item !== "beneficios")
    .reverse();

  return servicios.length ? (
    <Section id="servicios" fluid space>
      <CarouselProvider
        naturalSlideWidth={16}
        naturalSlideHeight={9}
        totalSlides={mainItems.length}
        isIntrinsicHeight={true}
        isPlaying={false}
        lockOnWindowScroll
        dragEnabled={false}
        touchEnabled={false}
      >
        <Tabs>
          {mainItems.map((item, index) => {
            return (
              <Tab key={index} slide={index}>
                {item}
              </Tab>
            );
          })}
        </Tabs>

        <Slider>
          {mainItems.map((mainItem, index) => {
            const items = servicios.filter(
              (servicio) => servicio?.attributes?.tipo === mainItem
            );
            return <ServicesCards key={index} {...{ items }} />;
          })}
        </Slider>
      </CarouselProvider>
    </Section>
  ) : null;
};

export default HomeServicios;

const Section = styled.section`
  ${container}
  padding: 0;

  .carousel__slider {
    overflow: initial;
  }
`;

const Tabs = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Tab = styled(Dot)`
  all: initial;
  font-family: inherit;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.15);
  color: #555555;
  background-color: ${colors.gray.lighter};
  padding: 1.5rem 2.5rem;
  text-transform: uppercase;
  font-weight: bold;
  cursor: pointer;
  &[disabled] {
    text-shadow: none;
    color: ${colors.primary.dark};
    background-color: #ffffff;
    cursor: initial;
  }
`;
