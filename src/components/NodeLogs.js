import { clearTextFromColorCodes } from "../helpers/helpers";

const NodeLogs = ({ logs }) => {


    const getLogType = (log) =>{
        let color = "border-yellow-400 text-yellow-400"
        let logType = 'INFO'

        if (log.indexOf('WARN') !== -1){
            color = "border-yellow-400 text-yellow-400";
            logType = 'WARN'
        }
       if (log.indexOf('INFO') !== -1){
           color = "border-gray-400 text-gray-400"
           logType = 'INFO'
        }
       if (log.indexOf('ERROR') !== -1) {
           color = "border-red-400 text-red-400"
           logType = 'ERROR'
        }
        return [color,logType]

    }

    const LogLine = ({ text }) => {
       
       const [color,logType] = getLogType(text)
     
        text = clearTextFromColorCodes(text)
        return (
            <div className="flex p-2 mx-2 text-xs border-b">
                <div className={`flex items-center px-3 mr-5 h-6 font-bold rounded-full border ${color}`}>{logType}</div>
                <div className="font-mono">{text}</div>
            </div>

        )
    }

    const LogList = () => logs.map((item, id) => {
        return <LogLine text={item} key={id} />
    })
    return (
        <div className="flex overflow-y-auto overflow-x-hidden flex-col justify-center items-center h-96 bg-white rounded-lg shadow">
            {logs.length ?
                LogList()
                :
                <div className="text-2xl italic text-gray-300">No logs or node is not running</div>
            }
        </div>
    )
}

export default NodeLogs;