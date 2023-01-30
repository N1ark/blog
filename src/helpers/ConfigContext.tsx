import { ComponentChildren, createContext, FunctionalComponent } from "preact";
import { useCallback, useContext, useEffect, useState } from "preact/hooks";

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

export const ConfigProvider: FunctionalComponent<ComponentChildren> = ({ children }) => {
    const [config, setConfig] = useState<Configuration>(() => {
        const savedConfig = localStorage.getItem(localStorageKey);
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            return { ...defaultConfig, ...config };
        }
        return defaultConfig;
    });

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
