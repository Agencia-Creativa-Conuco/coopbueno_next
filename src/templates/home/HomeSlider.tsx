import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { mq, container, bp } from 'components/grid'
import Carousel from 'react-slick'
import colors from 'styles/colors'

import { h1 } from 'styles/tipography'
import Cta from 'components/Cta'
import Image from 'next/image'

import { animated, config, Spring } from '@react-spring/web'
import { InView } from 'react-intersection-observer'
import { getStrapiURL } from 'lib/api'
import { SlideEntity } from 'client'

interface HomeSliderProps {
  slides?: SlideEntity[]
}
const HomeSlider = ({ slides = [] }: HomeSliderProps) => {
  return slides.length ? (
    <InView threshold={0.3}>
      {({ ref, inView }) => (
        <Section fluid space large ref={ref}>
          <Spring
            from={{
              opacity: 0,
              transform: `translateY(${inView ? '20rem' : '0'})`,
            }}
            to={{ opacity: 1, transform: 'translateY(0)' }}
            reset={inView}
            reverse={!inView}
            config={config.wobbly}
          >
            {(styles) => (
              <animated.div style={styles}>
                <Carousel
                  infinite={false}
                  autoplay
                  pauseOnHover
                  pauseOnFocus
                  adaptiveHeight
                  dots
                  responsive={[
                    {
                      breakpoint: bp.md,
                      settings: {
                        arrows: false,
                        dots: true,
                      },
                    },
                  ]}
                >
                  {slides.map((item, index) => {
                    const slide = item.attributes

                    return (
                      <Slide key={index}>
                        <Wrapper>
                          <InView>
                            {({ ref, inView }) => (
                              <Spring
                                config={config.wobbly}
                                reset={inView}
                                reverse={!inView}
                                from={{
                                  opacity: 0,
                                  transform: `translateX(${
                                    inView ? '-100%' : '0%'
                                  })`,
                                }}
                                to={{ opacity: 1, transform: 'translateX(0%)' }}
                              >
                                {(styles) => (
                                  <MediaWrapper ref={ref} {...{ colors }}>
                                    <animated.div style={styles}>
                                      <Media>
                                        <Image
                                          src={getStrapiURL(
                                            slide.imagen?.data.attributes.url,
                                          )}
                                          alt={
                                            slide.imagen?.data.attributes
                                              .alternativeText
                                          }
                                          width={1080}
                                          height={1080}
                                          objectFit="cover"
                                        />
                                      </Media>
                                    </animated.div>
                                  </MediaWrapper>
                                )}
                              </Spring>
                            )}
                          </InView>
                          <InView>
                            {({ ref, inView }) => (
                              <Spring
                                config={config.molasses}
                                reset={inView}
                                reverse={!inView}
                                from={{
                                  opacity: 0,
                                }}
                                to={{ opacity: 1 }}
                              >
                                {(styles) => (
                                  <animated.div style={styles} ref={ref}>
                                    <SlideInfo>
                                      <Title>{slide.titular}</Title>
                                      <Copy
                                        dangerouslySetInnerHTML={{
                                          __html: slide.copy,
                                        }}
                                      />
                                      <Cta cta={slide.cta} />
                                    </SlideInfo>
                                  </animated.div>
                                )}
                              </Spring>
                            )}
                          </InView>
                        </Wrapper>
                      </Slide>
                    )
                  })}
                </Carousel>
              </animated.div>
            )}
          </Spring>
        </Section>
      )}
    </InView>
  ) : null
}

export default HomeSlider

const Section = styled.section`
  ${container}

  .slick-dots {
    font-size: 0;
    button {
      background-color: ${colors.primary.base};
      opacity: 0.5;
      &:before {
        content: '';
      }
    }
    .slick-active {
      button {
        background-color: ${colors.primary.base};
        opacity: 1;
      }
    }
  }
`

const Slide = styled.li`
  margin: 0;
`

const Wrapper = styled.div`
  ${container}
  display: grid;
  gap: 0rem 5rem;
  grid-template-rows: 1fr;
  ${mq.md} {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: initial;
    align-items: center;
  }
`

const SlideInfo = styled.div`
  margin-bottom: 2rem;
  text-align: center;
  ${mq.md} {
    text-align: left;
  }
`

const Title = styled.h2`
  text-transform: uppercase;
  margin-top: 0;
  ${h1}
`

const Copy = styled.p``

const MediaWrapper = styled.div`
  position: relative;
  margin-bottom: 2rem;
  &:before {
    content: '';
    width: 15%;
    height: 15%;
    border-radius: 50%;
    background-color: ${colors.primary.light};
    position: absolute;
    z-index: 2;
    top: 0%;
    right: 0%;
    transform: translate(-50%, 50%);
    opacity: inherit;
  }
`

const Media = styled.div`
  position: relative;
  z-index: 1;
  clip-path: ellipse(50% 50% at 50% 50%);
  font-size: 0;
`

const DotGroupStyles = ({ colors }) => css`
  text-align: center;

  button {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: ${colors.green.base};
    opacity: 0.3;
    &[disabled] {
      opacity: 1;
    }
  }
`
