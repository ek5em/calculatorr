import { useState, useCallback, useRef, useEffect } from "react";

import CheckBoxes from "./CheckBoxes/CheckBoxes";
import FiguresSetting from "./FiguresSetting/FiguresSetting";

import './Graph3DUI.css';

const Graph3DUI = ({
    addFigure,
    checkBoxes,
    changeLightPower,
    scene,
    light,
    deleteFigure
}) => {
    const [showPanel, setShowPanel] = useState(false);
    const [showAddList, setShowAddList] = useState(false);

    const refLight = useRef(null);

    useEffect(() => {
        if (showPanel) {
            refLight.current.value = light.lumen;
        }
    })

    const showHidePanel = useCallback(() => {
        setShowPanel(!showPanel);
    }, [setShowPanel, showPanel]);

    const showHideAddList = useCallback(() => {
        setShowAddList(!showAddList);
    }, [setShowAddList, showAddList])

    const addFigureOnClick = useCallback((figure, index) => {
        addFigure(figure, index);
        showHideAddList();
    }, [addFigure, showHideAddList]);

    const changeLightPowerHandler = () => {
        changeLightPower(refLight.current.value - 0);
    }

    return (
        (<div className="graph3DUI">
            {showPanel && <div className="figures-menu">
                <CheckBoxes
                    checkBoxes={checkBoxes}
                />
                <div className="light-power-block">
                    <input
                        className="light-power"
                        type="range"
                        step={1000}
                        min={0}
                        max={50000}
                        ref={refLight}
                        onChange={changeLightPowerHandler}
                    />
                </div>
                <FiguresSetting
                    addFigure={addFigureOnClick}
                    showHideAddList={showHideAddList}
                    showAddList={showAddList}
                    scene={scene}
                    deleteFigure={deleteFigure}
                />
            </div>
            }
            <button onClick={showHidePanel}>
                {showPanel ? '⇐' : '⇒'}
            </button>
        </div>)
    )
}

export default Graph3DUI;