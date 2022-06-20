import React from 'react'
import Archivo from 'templates/academia/archivo'

import { GetStaticProps } from 'next'

import { useQuery, prepareReactRender, useHydrateCache } from 'client'
import { PropsWithServerCache } from '@gqty/react'
import Layout from 'components/Layout'

type PageProps = PropsWithServerCache<{}>
const Page = ({ cacheSnapshot }: PageProps) => {
  const query = useQuery()
  const articulos = query.articles({
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
        titulo="Academia de sueños"
        descripcion="Conocimiento que te acerca a tus sueños"
        articulos={articulos}
        categorias={categorias}
      />
    </Layout>
  )
}

export default Page

export const getStaticProps: GetStaticProps<PageProps> = async (_ctx) => {
  const { cacheSnapshot } = await prepareReactRender(<Page />)

  return {
    props: { cacheSnapshot },
  }
}