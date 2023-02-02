import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    FC,
    PropsWithChildren,
} from "react";

export type Configuration = {
    theme: "light" | "dark";
};

const defaultConfig: Configuration = {
    theme: "dark",
};

const ConfigContext = createContext<
    [Configuration, (newConfig: Partial<Configuration>) => void]
>([defaultConfig, () => {}]);

export const useConfig = () => useContext(ConfigContext);

const localStorageKey = "config";

export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
    const [config, setConfig] = useState<Configuration>(defaultConfig);

    useEffect(() => {
        const savedConfig = localStorage.getItem(localStorageKey);
        if (!savedConfig) {
            return setConfig(defaultConfig);
        }

        let config: Configuration;
        try {
            config = JSON.parse(savedConfig);
        } catch {
            return setConfig(defaultConfig);
        }

        if (!config) {
            return setConfig(defaultConfig);
        }

        setConfig({ ...defaultConfig, ...config });
    }, []);

    const configUpdater = useCallback(
        (newConfig: Partial<Configuration>) => {
            let fullNewConfig: Configuration;
            setConfig((c) => (fullNewConfig = { ...c, ...newConfig }));
            localStorage.setItem(localStorageKey, JSON.stringify(fullNewConfig!));
        },
        [setConfig]
    );

    useEffect(() => {
        const app = document.getElementsByTagName("body")[0] as HTMLBodyElement;
        app.classList.remove("light", "dark");
        app.classList.add(config.theme);
    }, [config.theme]);

    return (
        <ConfigContext.Provider value={[config, configUpdater]}>
            {children}
        </ConfigContext.Provider>
    );
};
