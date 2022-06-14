import React from 'react'
import Archivo from 'templates/academia/archivo'

import { GetStaticProps } from 'next'

import { useQuery, prepareReactRender, useHydrateCache } from 'client'
import { PropsWithServerCache } from '@gqty/react'
import Layout from 'components/Layout'

type PageProps = PropsWithServerCache<{
  slug: string
}>
const Page = ({ cacheSnapshot, slug }: PageProps) => {
  const query = useQuery()
  const [categoria] = query.categories({
    filters: {
      slug: {
        eq: slug,
      },
    },
  })?.data

  const articulos = query.articles({
    filters: {
      category: {
        slug: {
          eq: slug,
        },
      },
    },
    pagination: {
      pageSize: 16,
    },
  })?.data

  const categorias = query.categories({
    pagination: {
      pageSize: 100,
    },
  })?.data

  useHydrateCache({
    cacheSnapshot,
  })

  return (
    <Layout>
      <Archivo
        titulo={categoria.attributes.name}
        descripcion={categoria.attributes.description}
        articulos={articulos}
        categorias={categorias}
      />
    </Layout>
  )
}

export default Page

export const getStaticProps: GetStaticProps<PageProps> = async (_ctx) => {
  const slug = _ctx.params.slug.toString()

  const { cacheSnapshot } = await prepareReactRender(<Page slug={slug} />)

  return {
    props: { cacheSnapshot, slug },
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
