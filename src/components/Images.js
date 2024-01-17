import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  oneEpisodeData,
  episodeImagesData,
  fetchEpisodeCredits,
} from "../slices/appSlices";
import NavBar from "./NavBar";
import Row from "./Row";
import styles from "../styles/EpisodeDetail.module.scss";
import * as basicLightbox from "basiclightbox";

const EpisodeDetail = () => {
  const { seriesId, seasonNumber, episodeNumber } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      oneEpisodeData(
        `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?language=en-US`
      )
    );
  }, [dispatch, seriesId, seasonNumber, episodeNumber]);

  useEffect(() => {
    dispatch(
      episodeImagesData(
        `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images`
      )
    );
  }, [dispatch, seriesId, seasonNumber, episodeNumber]);

  const episodeImages = useSelector(
    (state) => state.app.episodeImage?.data?.stills
  );

  useEffect(() => {
    dispatch(
      fetchEpisodeCredits(
        `/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits?language=en-US`
      )
    );
  }, [dispatch, seriesId, seasonNumber, episodeNumber]);

  const { episodeData, episodeCredits } = useSelector(
    (state) => state.app
  );

  const director = episodeData?.data?.crew?.find(
    (member) => member.job === "Director"
  );
  const writer = episodeData?.data?.crew?.find(
    (member) => member.job === "Writer"
  );

  return (
    <div className={styles.episodeDetailContainer}>
      <NavBar />
      {episodeData?.data && (
        <div className={styles.episodeHeader}>
          <img
            className={styles.episodeBackdrop}
            src={`https://image.tmdb.org/t/p/w1280${episodeData?.data.still_path}`}
            alt={episodeData?.data.name}
          />
          <div className={styles.episodeInfo}>
            <img
              className={styles.episodePoster}
              src={`https://image.tmdb.org/t/p/w200${episodeData?.data.still_path}`}
              alt={episodeData?.data.name}
            />
            <div className={styles.episodeDetails}>
              <h2 className={styles.episodeTitle}>
                {episodeData?.data.name}
              </h2>
              <p className={styles.overview}>
                Overview: {episodeData?.data.overview}
              </p>
              <p>Air Date: {episodeData?.data.air_date}</p>
              <div>
                {director && <p>Director: {director.name}</p>}
                {writer && <p>Writer: {writer.name}</p>}
              </div>
              <p>
                S {episodeData?.data.season_number} E{" "}
                {episodeData?.data.episode_number}
              </p>
              <p>Runtime: {episodeData?.data.runtime}</p>
              <p>Rating {episodeData?.data.vote_average}</p>
              <p>Vote Count: {episodeData?.data.vote_count}</p>
            </div>
          </div>
          <div className={styles.episodeImagesContainer}>
            <div>
              <p>
                <strong>Images</strong>
              </p>
            </div>
            <div className={styles.episodeImages}>
              {episodeImages?.map((image, index) => (
                <div
                  key={index}
                  onClick={() => {
                    const instance = basicLightbox.create(`
                      <img src="https://image.tmdb.org/t/p/w1280${image.file_path}" width="800" height="600">
                    `);
                    instance.show();
                  }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w1280${image.file_path}`}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.episodes}>
            <p>
              <strong>Cast</strong>
            </p>
            <Row items={episodeCredits?.data?.cast} type="actor" />
          </div>
        </div>
      )}
    </div>
  );
};

export default EpisodeDetail;

