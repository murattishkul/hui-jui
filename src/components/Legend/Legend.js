import React from 'react'
import styled from 'styled-components'
import { 
    options
} from '../../data/colorPalette'

console.log(options)

const Legend = () => {
    return ( 
        options.map( option => 
        <div style={{display: 'flex'}}>
            <ColoredBox color={option.color}>
                <Range>{option.range}</Range>
            </ColoredBox>
        </div>
        )
    )
}

const ColoredBox = styled.div`
    border: 1px solid black;
    height: 30px;
    width: 100px;
    background: ${props => props.color ? props.color : 'red' };
    display: flex;
    justify-content: center;
    align-content: center;
`

const Range = styled.p`
    font-size: 18px;
    width: 100%;
    line-height: 0px;
    align-self: center;
    text-align: center;
    vertical-align: middle;
`

export default Legend