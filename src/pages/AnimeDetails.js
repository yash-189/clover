import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAnimeDetails } from "../api/animeApi";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Item from "../components/Item";
import Spinner from "../components/Spinner";
import StatusMessage from "../components/StatusMessage";
import { useGlobalContext } from "../context/AppContext";
import background from "../assets/images/background.jpg";

const AnimeDetails = () => {
  const { id } = useParams();
  const { topAnime } = useGlobalContext();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnime = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchAnimeDetails(id);
        setAnime(data);
      } catch (fetchError) {
        setError(fetchError.message || "Unable to load anime details right now.");
      } finally {
        setLoading(false);
      }
    };

    loadAnime();
  }, [id]);

  const relatedAnime = topAnime.filter((item) => item.id !== Number(id)).slice(0, 5);
  const displayTitle = anime?.titleEnglish || anime?.title || "Anime Details";
  const seasonLabel = anime?.season ? `${anime.season} ${anime.year}` : anime?.year;

  return (
    <>
      <div className="position-relative anime-details-page">
        <div className="position-absolute top-0 start-0 w-100">
          <img
            src={background}
            alt="background"
            className="img-fluid"
            style={{ height: "420px", width: "100vw", objectFit: "cover", filter: "brightness(0.28)" }}
          />
        </div>

        <div className="container position-relative pt-4 pb-5">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 text-white">
            <Link to="/" className="text-white text-decoration-none fw-bold">Back to Home</Link>
            <div className="d-flex gap-2">
              <a href={anime?.trailerLink || "#"} target="_blank" rel="noreferrer">
                <Button name="Watch Trailer" variant="primary" as="span" width="140px" />
              </a>
            </div>
          </div>

          {loading ? (
            <div className="mt-5 pt-5">
              <Spinner />
            </div>
          ) : null}

          {!loading && error ? (
            <div className="mt-5 pt-5">
              <StatusMessage
                title="Could not load anime details"
                message={error}
                error
              />
            </div>
          ) : null}

          {!loading && !error && anime ? (
            <>
              <div className="row align-items-center anime-details-hero">
                <div className="col-lg-4 col-md-5 col-12 mb-4 mb-md-0">
                  <img
                    src={anime.largeImage || anime.image}
                    alt={displayTitle}
                    className="img-fluid anime-details-poster"
                  />
                </div>

                <div className="col-lg-8 col-md-7 col-12 text-white">
                  <p className="anime-details-eyebrow mb-2">{anime.type} {seasonLabel ? `• ${seasonLabel}` : ""}</p>
                  <h1 className="anime-details-title">{displayTitle}</h1>
                  {anime.titleEnglish && anime.titleEnglish !== anime.title ? (
                    <p className="anime-details-subtitle">{anime.title}</p>
                  ) : null}

                  <div className="d-flex flex-wrap gap-2 my-4">
                    <span className="anime-details-pill">Score {anime.score}</span>
                    <span className="anime-details-pill">Rank {anime.rank}</span>
                    <span className="anime-details-pill">Episodes {anime.episodes}</span>
                    <span className="anime-details-pill">{anime.status}</span>
                    <span className="anime-details-pill">{anime.rating}</span>
                  </div>

                  <p className="anime-details-copy">{anime.synopsis}</p>

                  {anime.background ? (
                    <p className="anime-details-background mb-0">{anime.background}</p>
                  ) : null}

                  <div className="d-flex flex-wrap gap-2 mt-4">
                    {anime.genres.map((genre) => (
                      <span key={genre} className="anime-details-genre">{genre}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="row mt-5 g-4">
                <div className="col-lg-8">
                  <div className="anime-details-card">
                    <div className="d-flex justify-content-between py-2 mb-3">
                      <h6 className="subhead" style={{ fontFamily: "Roboto, sans-serif" }}>Trailer</h6>
                    </div>

                    {anime.trailerEmbedUrl ? (
                      <div className="anime-details-video-wrap">
                        <iframe
                          className="anime-details-video"
                          src={anime.trailerEmbedUrl}
                          title={`${displayTitle} trailer`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <StatusMessage
                        title="Trailer unavailable"
                        message="This anime does not have an embedded trailer right now."
                      />
                    )}
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="anime-details-card h-100">
                    <div className="d-flex justify-content-between py-2 mb-3">
                      <h6 className="subhead" style={{ fontFamily: "Roboto, sans-serif" }}>Quick Info</h6>
                    </div>

                    <div className="anime-details-info-list">
                      <div className="anime-details-info-item"><span>Type</span><strong>{anime.type}</strong></div>
                      <div className="anime-details-info-item"><span>Status</span><strong>{anime.status}</strong></div>
                      <div className="anime-details-info-item"><span>Episodes</span><strong>{anime.episodes}</strong></div>
                      <div className="anime-details-info-item"><span>Source</span><strong>{anime.source}</strong></div>
                      <div className="anime-details-info-item"><span>Rating</span><strong>{anime.rating}</strong></div>
                      <div className="anime-details-info-item"><span>Season</span><strong>{seasonLabel || "N/A"}</strong></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="anime-details-card mt-5">
                <div className="d-flex justify-content-between py-2 mb-3">
                  <h6 className="subhead" style={{ fontFamily: "Roboto, sans-serif" }}>More Top Picks</h6>
                </div>

                <div className="d-flex flex-wrap justify-content-center justify-content-lg-between">
                  {relatedAnime.map((item) => (
                    <Item
                      key={item.id}
                      id={item.id}
                      image={item.image}
                      title={item.title ? item.title.slice(0, 15) : "not available"}
                      link={item.link}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AnimeDetails;
