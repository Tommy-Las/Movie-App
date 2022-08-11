import React from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { IoClose }  from "react-icons/io5";
import removeMovieWatchlist from '../functions/removeMovieWatchlist'

export default function RemoveFromWatchlistButton() {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Remove from Watchlist
        </Tooltip>
      );
    
      return (
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
        <Button className='watchlist-btn' variant="danger" onClick={() => {removeMovieWatchlist()}}>
            <IoClose className="icon" />
        </Button>
        </OverlayTrigger>
      );
}
