import React, { Component } from "react"

import PropTypes from "prop-types"

import { Container, Header, SongList, SongItem } from "./styles"

import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { Creators as PlaylistDetailsActions } from "../../store/ducks/playlistDetails"
import { Creators as PlayerActions } from "../../store/ducks/player"

import ClockIcon from "../../assets/images/clock.svg"
import PlusIcon from "../../assets/images/plus.svg"

import Loading from "../../components/Loading"

class Playlist extends Component {
    state = {
        selectedSong: null
    }

    static propsTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.number
            })
        }).isRequired,
        getPlaylistDetailsRequest: PropTypes.func.isRequired,
        laodSong: PropTypes.func.isRequired,
        currentSong: PropTypes.shape({
            id: PropTypes.number
        }).isRequired,
        playlistDetails: PropTypes.shape({
            data: PropTypes.shape({
                thumbnail: PropTypes.string,
                title: PropTypes.title,
                description: PropTypes.description,
                songs: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.number,
                    title: PropTypes.string,
                    author: PropTypes.string,
                    album: PropTypes.string
                }))
            })
        })
    }
    componentDidMount() {
        this.loadPlaylistDetails()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.loadPlaylistDetails()
        }
    }

    loadPlaylistDetails = () => {
        const { id } = this.props.match.params

        this.props.getPlaylistDetailsRequest(id)
    }

    renderDetails = () => {
        const playlist = this.props.playlistDetails.data

        return (
            <Container>
                <Header>
                    <img src={playlist.thumbnail} alt={playlist.title} />
                    <div>
                        <span>PLAYLIST</span>
                        <h1>{playlist.title}</h1>
                        {!!playlist.songs && <p>{playlist.songs.lenght} músicas</p>}
                        <button>PLAY</button>
                    </div>
                </Header>
                <SongList cellPadding={0} cellSpacing={0}>
                    <thead>
                        <th></th>
                        <th>Título</th>
                        <th>Artista</th>
                        <th>Álbum</th>
                        <th><img src={ClockIcon} alt="Duração" /></th>
                    </thead>

                    <tbody>
                        {!playlist.songs ? (
                            <tr>
                                <td colSpan={5}>Nenhuma música cadastrada</td>
                            </tr>
                        ) : (
                                playlist.songs.map(song => (
                                    <SongItem
                                        key={song.id}
                                        onClick={() => this.setState({ selectedSong: song.id })}
                                        onDoubleClick={() => this.props.loadSong(song, playlist.songs)}
                                        selected={this.state.selectedSong === song.id}
                                        playing={this.props.currentSong && this.props.currentSong.id === song.id}
                                    >
                                        <td><img src={PlusIcon} alt="Adicionar" /></td>
                                        <td>{song.title}</td>
                                        <td>{song.author}</td>
                                        <td>{song.album}</td>
                                        <td>3:56</td>
                                    </SongItem>
                                ))
                            )}
                    </tbody>
                </SongList>
            </Container>
        )
    }

    render() {
        return this.props.playlistDetails.loading ? (
            <Container loading><Loading /></Container>) : (
                this.renderDetails()
            )
    }
}

const mapStateToProps = state => ({
    playlistDetails: state.playlistDetails,
    currentSong: state.player.currentSong
})

const mapDispatchToProps = dispatch => bindActionCreators({ ...PlaylistDetailsActions, ...PlayerActions }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Playlist)