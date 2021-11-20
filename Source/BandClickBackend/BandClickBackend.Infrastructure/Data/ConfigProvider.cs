using System.IO;
using System.Text.Json;
using BandClickBackend.Domain.Utils;

namespace BandClickBackend.Infrastructure.Data
{
    public static class ConfigProvider
    {
        public static Config Config { get; private set; } = null;

        public static Config GetConfig()
        {
            string configPath = $"{Directory.GetCurrentDirectory()}{Path.DirectorySeparatorChar}BandClickConfig.json";
            var fileContent = File.ReadAllText(configPath);
            Config config = JsonSerializer.Deserialize<Config>(fileContent, new JsonSerializerOptions
            {
                AllowTrailingCommas = true,
                IgnoreNullValues = false,
                ReadCommentHandling = JsonCommentHandling.Skip
            });
            Config = config;
            return Config;
        }
    }
}
