import React from 'react';
import cn from 'classnames'
import CarBrandAndSeries from './carBrandAndSeries/carBrandAndSeries'

const Series = (props) =>{ 
    const {char , brand , series , onChoose} = props
return(
    <div>
        {CarBrandAndSeries[char].map(item => item.name == brand 
            ? item.series.map(item => {
                return <a   href= "javascript:;" 
                            key={item}
                            className={cn({
                              "line":true,
                              "cur":item == series
                            })}
                            onClick = {() => onChoose(item)}             
                        >
                            {item}
                        </a>
            }) 
            : "")}
    </div>
)};
export default Series;
