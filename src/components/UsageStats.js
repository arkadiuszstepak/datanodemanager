const UsageStats = ({ stats }) => {

    const CpuPercentage = () => {
        if (stats.data === undefined) return 0
        const used = stats.data.cpu_stats.cpu_usage.total_usage;
        const max = stats.data.cpu_stats.system_cpu_usage;
        return (used * 100 / max).toFixed(3);
    }


    const MemoryuPercentage = () => {
        if (stats.data === undefined) return 0
        const used = stats.data.memory_stats.usage;
        const max = stats.data.memory_stats.limit;
        return (used * 100 / max).toFixed(3);
    }

    const MemoryMegs = () => {
        if (stats.data === undefined) return 0

        const used = stats.data.memory_stats.usage;
        return (used / 1024 ** 2).toFixed(3);
    }

    const Network = () => {
        if (stats.data === undefined) return 0
        if (stats.data.networks === undefined) return 0
        const used = stats.data.networks.eth0.rx_bytes;

        let mem = (used / 1024)

        if (mem > 1024.0) {
            return (mem / 1024).toFixed(3).toString() + "MB"
        }
        return mem.toFixed(3).toString() + "kB";
    }

    return (
        <div id="wrapper" className="px-4 py-4 mx-auto w-full bg-white rounded-lg shadow">
            <div className="sm:grid sm:h-32 sm:grid-flow-row sm:gap-4 sm:grid-cols-3">
                <div className="flex flex-col justify-center px-4 py-4 bg-white border-r">
                    <div>
                        <p className="text-3xl font-semibold text-center text-gray-800">{CpuPercentage()}%</p>
                        <p className="text-lg text-center text-gray-500">CPU </p>
                    </div>
                </div>

                <div className="flex flex-col px-4 py-2 bg-white border-r j 00 sm:mt-0">
                    <div>
                        <div>
                            <p className="flex justify-end items-center text-green-500 text-md">
                                <span className="font-bold">{MemoryMegs()} MB</span>
                            </p>
                        </div>
                        <p className="text-3xl font-semibold text-center text-gray-800">{MemoryuPercentage()}%</p>
                        <p className="text-lg text-center text-gray-500">MEMORY </p>
                    </div>
                </div>

                <div className="flex flex-col justify-center px-4 py-4 mt-4 bg-white sm:mt-0">
                    <div>
                        <p className="text-3xl font-semibold text-center text-gray-800">{Network()}</p>
                        <p className="text-lg text-center text-gray-500">NETWORK</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UsageStats