import { useState } from 'react';
import './WireSequenceModule.css';

function WireSequenceModule() {

    const [viewedRedWires, setViewedRedWires] = useState([false, false, false, false, false, false, false, false, false]);
    const [viewedBlueWires, setViewedBlueWires] = useState([false, false, false, false, false, false, false, false, false]);
    const [viewedBlackWires, setViewedBlackWires] = useState([false, false, false, false, false, false, false, false, false]);

    function toggleViewed(colorIndex: number, rowIndex: number): void {
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
    }

    function reset() {
        setViewedRedWires([false, false, false, false, false, false, false, false, false]);
        setViewedBlueWires([false, false, false, false, false, false, false, false, false]);
        setViewedBlackWires([false, false, false, false, false, false, false, false, false]);
    }

    function isViewed(colorIndex: number, rowIndex: number): boolean {
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
        </div> 
    );
}

export default WireSequenceModule;
