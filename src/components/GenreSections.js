import React from 'react'
import { useGlobalContext } from '../context/AppContext';
import Item from "./Item";
import Spinner from './Spinner';
import VerticalButton from './VerticalButton';
import SectionHeader from './SectionHeader';
import StatusMessage from './StatusMessage';

const genreSections = [
  { label: "ACTION", start: 0, end: 5 },
  { label: "SHOUNEM", start: 5, end: 10 },
  { label: "COMEDY", start: 10, end: 15 },
];

const GenreSections = ({ heading1, heading2 }) => {
  const { topAnime, loadingTopAnime, topAnimeError, reloadTopAnime } = useGlobalContext();

  return (
    <div className="">
      <SectionHeader heading1={heading1} heading2={heading2} />

      {loadingTopAnime ? <Spinner /> : null}
      {!loadingTopAnime && topAnimeError ? (
        <StatusMessage
          title="Could not load genres"
          message={topAnimeError}
          actionLabel="Retry"
          onAction={reloadTopAnime}
          error
        />
      ) : null}

      {!loadingTopAnime && !topAnimeError ? genreSections.map((section) => (
        <div
          key={section.label}
          className="d-flex justify-content-lg-around justify-content-md-between justify-content-around flex-lg-nowrap flex-wrap py-2 position-relative"
          style={{ padding: "0 30px" }}
        >
          <VerticalButton name={section.label} variant="primary" />
          {topAnime.slice(section.start, section.end).map((anime) => (
            <React.Fragment key={anime.id}>
              <div>
                <Item
                  id={anime.id}
                  image={anime.image}
                  title={anime.title ? anime.title.slice(0, 15) : "not available"}
                  link={anime.trailerLink}
                />
              </div>
              <VerticalButton name={"EXPLORE"} variant="secondary" />
            </React.Fragment>
          ))}
        </div>
      )) : null}
    </div>
  );
}

export default GenreSections
