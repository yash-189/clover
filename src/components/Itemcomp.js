import React from 'react'
import { GENRES, useGlobalContext } from './Context';
import Item from "./Item";
import { ErrorRow, PosterSkeleton } from './Skeleton';
import Vbutton from './Vbutton';
import Vbutton2 from './Vbutton2';

const Itemcomp = ({ heading1, heading2, genreIds }) => {
    const { genres, loadGenre } = useGlobalContext();

    return (
        <div className="">
            {heading1 && (
                <div className="d-flex justify-content-between py-2" style={{ padding: "0 30px" }}>
                    <h6 className="subhead" style={{ fontFamily: "Roboto, sans-serif" }}>{heading1}</h6>
                    <h6 className="sublink" style={{ fontFamily: "Roboto, sans-serif" }}><a href="https://anilist.co/search/anime" target="_blank" rel="noreferrer"> <div className="arrow"></div>{heading2}</a></h6>
                </div>
            )}
            {GENRES.filter((g) => genreIds.includes(g.id)).map((g) => {
                const row = genres[g.id] || { items: [], loading: true };
                return (
                    <div key={g.id} className="d-flex justify-content-lg-around justify-content-md-between justify-content-around flex-lg-nowrap flex-wrap py-2 position-relative" style={{ padding: "0 30px" }}>
                        <Vbutton name={g.name} />
                        {row.loading && Array.from({ length: 5 }, (_, i) => <PosterSkeleton key={i} />)}
                        {row.error && <ErrorRow message={row.error} onRetry={() => loadGenre(g.id)} />}
                        {!row.loading && !row.error && row.items.map((a) => (
                            <div key={a.id}>
                                <Item image={a.poster} title={a.title ? a.title.slice(0, 15) : "not available"} link={a.url} />
                            </div>
                        ))}
                        <a href={`https://anilist.co/search/anime?${g.explore}`} target="_blank" rel="noreferrer"><Vbutton2 name={"EXPLORE"} /></a>
                    </div>
                );
            })}
        </div>
    );
}

export default Itemcomp
