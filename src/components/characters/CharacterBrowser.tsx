import * as React from "react"
import { connect } from "react-redux";

// Type imports
import { RootState } from "../../redux/store"

const CharacterBrowser = (props: any) => {

    let { characters } = props;

    return (
        <>
            {
                characters.characters.length > 0 &&
                <ul>
                    {
                        characters.characters.map((char: { [key: string]: any }) => <li key={char.id}>{char.name}</li>)
                    }
                </ul>
            }
        </>
    )

}

const mapStateToProps = (state: RootState) => ({
    characters: state.characters
})

export default connect(mapStateToProps)(CharacterBrowser)