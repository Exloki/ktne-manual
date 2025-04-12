import { useState } from 'react';
import './WireSequenceModule.css';

function WireSequenceModule() {
    // First table states
    const [viewedRedWires, setViewedRedWires] = useState([false, false, false, false, false, false, false, false, false]);
    const [viewedBlueWires, setViewedBlueWires] = useState([false, false, false, false, false, false, false, false, false]);
    const [viewedBlackWires, setViewedBlackWires] = useState([false, false, false, false, false, false, false, false, false]);

    // Second table states
    const [viewedRedWires2, setViewedRedWires2] = useState([false, false, false, false, false, false, false, false, false]);
    const [viewedBlueWires2, setViewedBlueWires2] = useState([false, false, false, false, false, false, false, false, false]);
    const [viewedBlackWires2, setViewedBlackWires2] = useState([false, false, false, false, false, false, false, false, false]);

    function toggleViewed(colorIndex: number, rowIndex: number, tableNum: number = 1): void {
        if (tableNum === 1) {
            switch (colorIndex) {
                case 0:
                    let nextRed = viewedRedWires.findIndex((x) => !x);
                    if(nextRed === -1) {nextRed = 9}

                    if(nextRed - 1 === rowIndex){
                        viewedRedWires[rowIndex] = !viewedRedWires[rowIndex];
                    }else{
                        viewedRedWires[nextRed] = true;
                    }
                    setViewedRedWires([...viewedRedWires]);
                    break;
                case 1:
                    let nextBlue = viewedBlueWires.findIndex((x) => !x);
                    if(nextBlue === -1) {nextBlue = 9}

                    if(nextBlue - 1 === rowIndex){
                        viewedBlueWires[rowIndex] = !viewedBlueWires[rowIndex];
                    }else{
                        viewedBlueWires[nextBlue] = true;
                    }
                    setViewedBlueWires([...viewedBlueWires]);
                    break;
                case 2:
                    let nextBlack = viewedBlackWires.findIndex((x) => !x);
                    if(nextBlack === -1) {nextBlack = 9}

                    if(nextBlack - 1 === rowIndex){
                        viewedBlackWires[rowIndex] = !viewedBlackWires[rowIndex];
                    }else{
                        viewedBlackWires[nextBlack] = true;
                    }
                    setViewedBlackWires([...viewedBlackWires]);
                    break;
                default:
                    return;
            }
        } else {
            switch (colorIndex) {
                case 0:
                    let nextRed = viewedRedWires2.findIndex((x) => !x);
                    if(nextRed === -1) {nextRed = 9}

                    if(nextRed - 1 === rowIndex){
                        viewedRedWires2[rowIndex] = !viewedRedWires2[rowIndex];
                    }else{
                        viewedRedWires2[nextRed] = true;
                    }
                    setViewedRedWires2([...viewedRedWires2]);
                    break;
                case 1:
                    let nextBlue = viewedBlueWires2.findIndex((x) => !x);
                    if(nextBlue === -1) {nextBlue = 9}

                    if(nextBlue - 1 === rowIndex){
                        viewedBlueWires2[rowIndex] = !viewedBlueWires2[rowIndex];
                    }else{
                        viewedBlueWires2[nextBlue] = true;
                    }
                    setViewedBlueWires2([...viewedBlueWires2]);
                    break;
                case 2:
                    let nextBlack = viewedBlackWires2.findIndex((x) => !x);
                    if(nextBlack === -1) {nextBlack = 9}

                    if(nextBlack - 1 === rowIndex){
                        viewedBlackWires2[rowIndex] = !viewedBlackWires2[rowIndex];
                    }else{
                        viewedBlackWires2[nextBlack] = true;
                    }
                    setViewedBlackWires2([...viewedBlackWires2]);
                    break;
                default:
                    return;
            }
        }
    }

    function reset(tableNum: number = 1) {
        if (tableNum === 1) {
            setViewedRedWires([false, false, false, false, false, false, false, false, false]);
            setViewedBlueWires([false, false, false, false, false, false, false, false, false]);
            setViewedBlackWires([false, false, false, false, false, false, false, false, false]);
        } else {
            setViewedRedWires2([false, false, false, false, false, false, false, false, false]);
            setViewedBlueWires2([false, false, false, false, false, false, false, false, false]);
            setViewedBlackWires2([false, false, false, false, false, false, false, false, false]);
        }
    }

    function isViewed(colorIndex: number, rowIndex: number, tableNum: number = 1): boolean {
        if (tableNum === 1) {
            switch (colorIndex) {
                case 0:
                    return viewedRedWires[rowIndex];
                case 1:
                    return viewedBlueWires[rowIndex];
                case 2:
                    return viewedBlackWires[rowIndex];
                default:
                    return false;
            }
        } else {
            switch (colorIndex) {
                case 0:
                    return viewedRedWires2[rowIndex];
                case 1:
                    return viewedBlueWires2[rowIndex];
                case 2:
                    return viewedBlackWires2[rowIndex];
                default:
                    return false;
            }
        }
    }

    return (
        <div className="wireSequenceModule">
            <h3>Wire Sequences</h3>
            <p>Whether or not to cut a wire depends on the <i>cumulative</i> number of occurrences of <b>each color</b> in <i>that module</i></p>
            <table className="table_wiresequence">
                <tbody>
                    <tr>
                        <th colSpan={2} onClick={() => toggleViewed(0, -2)}>RED</th>
                        <th colSpan={2} onClick={() => toggleViewed(1, -2)}>BLUE</th>
                        <th colSpan={2} onClick={() => toggleViewed(2, -2)}>BLACK</th>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 0) ? "viewed" : ""} onClick={() => toggleViewed(0, 0)} >1</th>
                        <td className={isViewed(0, 0) ? "viewed" : ""} onClick={() => toggleViewed(0, 0)} ><b>C</b></td>
                        <th className={isViewed(1, 0) ? "viewed" : ""} onClick={() => toggleViewed(1, 0)} >1</th>
                        <td className={isViewed(1, 0) ? "viewed" : ""} onClick={() => toggleViewed(1, 0)} ><b>B</b></td>
                        <th className={isViewed(2, 0) ? "viewed" : ""} onClick={() => toggleViewed(2, 0)} >1</th>
                        <td className={isViewed(2, 0) ? "viewed" : ""} onClick={() => toggleViewed(2, 0)} ><b>any</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 1) ? "viewed" : ""} onClick={() => toggleViewed(0, 1)} >2</th>
                        <td className={isViewed(0, 1) ? "viewed" : ""} onClick={() => toggleViewed(0, 1)} ><b>B</b></td>
                        <th className={isViewed(1, 1) ? "viewed" : ""} onClick={() => toggleViewed(1, 1)} >2</th>
                        <td className={isViewed(1, 1) ? "viewed" : ""} onClick={() => toggleViewed(1, 1)} ><b>AC</b></td>
                        <th className={isViewed(2, 1) ? "viewed" : ""} onClick={() => toggleViewed(2, 1)} >2</th>
                        <td className={isViewed(2, 1) ? "viewed" : ""} onClick={() => toggleViewed(2, 1)} ><b>AC</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 2)} >3</th>
                        <td className={isViewed(0, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 2)} ><b>A</b></td>
                        <th className={isViewed(1, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 2)} >3</th>
                        <td className={isViewed(1, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 2)} ><b>B</b></td>
                        <th className={isViewed(2, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 2)} >3</th>
                        <td className={isViewed(2, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 2)} ><b>B</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 3) ? "viewed" : ""} onClick={() => toggleViewed(0, 3)} >4</th>
                        <td className={isViewed(0, 3) ? "viewed" : ""} onClick={() => toggleViewed(0, 3)} ><b>AC</b></td>
                        <th className={isViewed(1, 3) ? "viewed" : ""} onClick={() => toggleViewed(1, 3)} >4</th>
                        <td className={isViewed(1, 3) ? "viewed" : ""} onClick={() => toggleViewed(1, 3)} ><b>A</b></td>
                        <th className={isViewed(2, 3) ? "viewed" : ""} onClick={() => toggleViewed(2, 3)} >4</th>
                        <td className={isViewed(2, 3) ? "viewed" : ""} onClick={() => toggleViewed(2, 3)} ><b>AC</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 4) ? "viewed" : ""} onClick={() => toggleViewed(0, 4)} >5</th>
                        <td className={isViewed(0, 4) ? "viewed" : ""} onClick={() => toggleViewed(0, 4)} ><b>B</b></td>
                        <th className={isViewed(1, 4) ? "viewed" : ""} onClick={() => toggleViewed(1, 4)} >5</th>
                        <td className={isViewed(1, 4) ? "viewed" : ""} onClick={() => toggleViewed(1, 4)} ><b>B</b></td>
                        <th className={isViewed(2, 4) ? "viewed" : ""} onClick={() => toggleViewed(2, 4)} >5</th>
                        <td className={isViewed(2, 4) ? "viewed" : ""} onClick={() => toggleViewed(2, 4)} ><b>B</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 5) ? "viewed" : ""} onClick={() => toggleViewed(0, 5)} >6</th>
                        <td className={isViewed(0, 5) ? "viewed" : ""} onClick={() => toggleViewed(0, 5)} ><b>AC</b></td>
                        <th className={isViewed(1, 5) ? "viewed" : ""} onClick={() => toggleViewed(1, 5)} >6</th>
                        <td className={isViewed(1, 5) ? "viewed" : ""} onClick={() => toggleViewed(1, 5)} ><b>BC</b></td>
                        <th className={isViewed(2, 5) ? "viewed" : ""} onClick={() => toggleViewed(2, 5)} >6</th>
                        <td className={isViewed(2, 5) ? "viewed" : ""} onClick={() => toggleViewed(2, 5)} ><b>BC</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 6) ? "viewed" : ""} onClick={() => toggleViewed(0, 6)} >7</th>
                        <td className={isViewed(0, 6) ? "viewed" : ""} onClick={() => toggleViewed(0, 6)} ><b>any</b></td>
                        <th className={isViewed(1, 6) ? "viewed" : ""} onClick={() => toggleViewed(1, 6)} >7</th>
                        <td className={isViewed(1, 6) ? "viewed" : ""} onClick={() => toggleViewed(1, 6)} ><b>C</b></td>
                        <th className={isViewed(2, 6) ? "viewed" : ""} onClick={() => toggleViewed(2, 6)} >7</th>
                        <td className={isViewed(2, 6) ? "viewed" : ""} onClick={() => toggleViewed(2, 6)} ><b>AB</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 7) ? "viewed" : ""} onClick={() => toggleViewed(0, 7)} >8</th>
                        <td className={isViewed(0, 7) ? "viewed" : ""} onClick={() => toggleViewed(0, 7)} ><b>AB</b></td>
                        <th className={isViewed(1, 7) ? "viewed" : ""} onClick={() => toggleViewed(1, 7)} >8</th>
                        <td className={isViewed(1, 7) ? "viewed" : ""} onClick={() => toggleViewed(1, 7)} ><b>AC</b></td>
                        <th className={isViewed(2, 7) ? "viewed" : ""} onClick={() => toggleViewed(2, 7)} >8</th>
                        <td className={isViewed(2, 7) ? "viewed" : ""} onClick={() => toggleViewed(2, 7)} ><b>C</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 8) ? "viewed" : ""} onClick={() => toggleViewed(0, 8)} >9</th>
                        <td className={isViewed(0, 8) ? "viewed" : ""} onClick={() => toggleViewed(0, 8)} ><b>B</b></td>
                        <th className={isViewed(1, 8) ? "viewed" : ""} onClick={() => toggleViewed(1, 8)} >9</th>
                        <td className={isViewed(1, 8) ? "viewed" : ""} onClick={() => toggleViewed(1, 8)} ><b>A</b></td>
                        <th className={isViewed(2, 8) ? "viewed" : ""} onClick={() => toggleViewed(2, 8)} >9</th>
                        <td className={isViewed(2, 8) ? "viewed" : ""} onClick={() => toggleViewed(2, 8)} ><b>C</b></td>
                    </tr>
                </tbody>
            </table>

            <h3 onClick={() => reset()} className="reset">RESET</h3>

            <div style={{ paddingTop: '50px' }}></div>

            <h3>Extra Wire Sequences Input</h3>
            <p>For the speedrunners who tackle two at once</p>
            <table className="table_wiresequence">
                <tbody>
                    <tr>
                        <th colSpan={2} onClick={() => toggleViewed(0, -2, 2)}>RED</th>
                        <th colSpan={2} onClick={() => toggleViewed(1, -2, 2)}>BLUE</th>
                        <th colSpan={2} onClick={() => toggleViewed(2, -2, 2)}>BLACK</th>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 0, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 0, 2)} >1</th>
                        <td className={isViewed(0, 0, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 0, 2)} ><b>C</b></td>
                        <th className={isViewed(1, 0, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 0, 2)} >1</th>
                        <td className={isViewed(1, 0, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 0, 2)} ><b>B</b></td>
                        <th className={isViewed(2, 0, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 0, 2)} >1</th>
                        <td className={isViewed(2, 0, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 0, 2)} ><b>any</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 1, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 1, 2)} >2</th>
                        <td className={isViewed(0, 1, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 1, 2)} ><b>B</b></td>
                        <th className={isViewed(1, 1, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 1, 2)} >2</th>
                        <td className={isViewed(1, 1, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 1, 2)} ><b>AC</b></td>
                        <th className={isViewed(2, 1, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 1, 2)} >2</th>
                        <td className={isViewed(2, 1, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 1, 2)} ><b>AC</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 2, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 2, 2)} >3</th>
                        <td className={isViewed(0, 2, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 2, 2)} ><b>A</b></td>
                        <th className={isViewed(1, 2, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 2, 2)} >3</th>
                        <td className={isViewed(1, 2, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 2, 2)} ><b>B</b></td>
                        <th className={isViewed(2, 2, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 2, 2)} >3</th>
                        <td className={isViewed(2, 2, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 2, 2)} ><b>B</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 3, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 3, 2)} >4</th>
                        <td className={isViewed(0, 3, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 3, 2)} ><b>AC</b></td>
                        <th className={isViewed(1, 3, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 3, 2)} >4</th>
                        <td className={isViewed(1, 3, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 3, 2)} ><b>A</b></td>
                        <th className={isViewed(2, 3, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 3, 2)} >4</th>
                        <td className={isViewed(2, 3, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 3, 2)} ><b>AC</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 4, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 4, 2)} >5</th>
                        <td className={isViewed(0, 4, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 4, 2)} ><b>B</b></td>
                        <th className={isViewed(1, 4, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 4, 2)} >5</th>
                        <td className={isViewed(1, 4, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 4, 2)} ><b>B</b></td>
                        <th className={isViewed(2, 4, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 4, 2)} >5</th>
                        <td className={isViewed(2, 4, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 4, 2)} ><b>B</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 5, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 5, 2)} >6</th>
                        <td className={isViewed(0, 5, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 5, 2)} ><b>AC</b></td>
                        <th className={isViewed(1, 5, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 5, 2)} >6</th>
                        <td className={isViewed(1, 5, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 5, 2)} ><b>BC</b></td>
                        <th className={isViewed(2, 5, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 5, 2)} >6</th>
                        <td className={isViewed(2, 5, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 5, 2)} ><b>BC</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 6, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 6, 2)} >7</th>
                        <td className={isViewed(0, 6, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 6, 2)} ><b>any</b></td>
                        <th className={isViewed(1, 6, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 6, 2)} >7</th>
                        <td className={isViewed(1, 6, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 6, 2)} ><b>C</b></td>
                        <th className={isViewed(2, 6, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 6, 2)} >7</th>
                        <td className={isViewed(2, 6, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 6, 2)} ><b>AB</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 7, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 7, 2)} >8</th>
                        <td className={isViewed(0, 7, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 7, 2)} ><b>AB</b></td>
                        <th className={isViewed(1, 7, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 7, 2)} >8</th>
                        <td className={isViewed(1, 7, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 7, 2)} ><b>AC</b></td>
                        <th className={isViewed(2, 7, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 7, 2)} >8</th>
                        <td className={isViewed(2, 7, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 7, 2)} ><b>C</b></td>
                    </tr>
                    <tr>
                        <th className={isViewed(0, 8, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 8, 2)} >9</th>
                        <td className={isViewed(0, 8, 2) ? "viewed" : ""} onClick={() => toggleViewed(0, 8, 2)} ><b>B</b></td>
                        <th className={isViewed(1, 8, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 8, 2)} >9</th>
                        <td className={isViewed(1, 8, 2) ? "viewed" : ""} onClick={() => toggleViewed(1, 8, 2)} ><b>A</b></td>
                        <th className={isViewed(2, 8, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 8, 2)} >9</th>
                        <td className={isViewed(2, 8, 2) ? "viewed" : ""} onClick={() => toggleViewed(2, 8, 2)} ><b>C</b></td>
                    </tr>
                </tbody>
            </table>

            <h3 onClick={() => reset(2)} className="reset">RESET</h3>
        </div> 
    );
}

export default WireSequenceModule;
