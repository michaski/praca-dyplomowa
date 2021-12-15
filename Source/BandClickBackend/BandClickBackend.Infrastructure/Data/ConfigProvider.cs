using System;
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

        public static void SaveSuperAdminId(Guid id)
        {
            Config.SuperAdmin.Id = id;
            var serializedConfig = JsonSerializer.Serialize<Config>(Config, new JsonSerializerOptions
            {
                AllowTrailingCommas = true,
                IgnoreNullValues = false,
                ReadCommentHandling = JsonCommentHandling.Skip,
                WriteIndented = true
            });
            string configPath = $"{Directory.GetCurrentDirectory()}{Path.DirectorySeparatorChar}BandClickConfig.json";
            File.WriteAllText(configPath, serializedConfig);
        }
    }
}
