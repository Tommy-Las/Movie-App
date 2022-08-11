import React from 'react'
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { IoAdd} from "react-icons/io5";
import addMovieWatchlist from '../functions/addMovieWatchlist'


export default function AddToWatchlistButton() {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Add to Watchlist
        </Tooltip>
      );
    
      return (
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
        <Button className='watchlist-btn'  variant="success" onClick={() => {addMovieWatchlist()}}>
            <IoAdd className='icon' />
        </Button>
        </OverlayTrigger>
      );
}
