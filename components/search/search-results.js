import React from "react";
import { connect, styled } from "frontity";
import Archive from "../archive";
import ArchiveHeader from "../archive/archive-header";
import SectionContainer from "../styles/section-container";
import SearchForm from "./search-form";
import { mq } from "../layout";

const reverseFormat = (query) => query.replace("+", " ");

const SearchResults = ({ state }) => {
  const { primary } = state.theme.colors;

  // Get information about the current URL.
  const data = state.source.get(state.router.link);

  // data.total → total pages that match the current path/url
  // data.searchQuery → query done to get search results
  const { total, searchQuery } = data;
  const isEmpty = data.total === 0;

  return (
    <>
      <ArchiveHeader label="Búsqueda" labelColor={primary.base}>
        <span>{`“${reverseFormat(searchQuery)}”`}</span>
        <IntroText size="thin">
          {isEmpty ? (
            <Text>
              No pudimos encontrar un resultado para tu búsqueda. Puedes
              intentarlo nuevamente escribiendo algo abajo.
            </Text>
          ) : (
            <Text>
              Encontramos {total} {total === 1 ? "resultado" : "resultados"}{" "}
              para tu búsqueda.
            </Text>
          )}
        </IntroText>
      </ArchiveHeader>

      {isEmpty ? (
        <SearchContainer size="thin">
          <SearchForm />
        </SearchContainer>
      ) : (
        <Archive showExcerpt={true} showMedia={false} />
      )}
    </>
  );
};

export default connect(SearchResults);

const IntroText = styled(SectionContainer)`
  width: 100%;
  margin-top: 2rem;
  font-weight: initial;

  @include mq(md) {
    font-size: 2rem;
    margin-top: 2.5rem;
  }
`;

const Text = styled.p`
  margin: 0 0 1em 0;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SearchContainer = styled(SectionContainer)`
  padding-top: 5rem;
  @include mq(md) {
    padding-top: 6rem;
  }
`;
