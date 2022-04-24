using Microsoft.Extensions.FileProviders;

namespace PJ1.Frontend_By_Angular.Configures
{
    /// <summary>
    /// Класс с общими настройками
    /// </summary>
    public static class ConfigureCommon
    {
        /// <summary>
        /// Задает общие настройки
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public static void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();
            app.UseDefaultFiles();

            // app.UseDefaultFiles(new DefaultFilesOptions
            // {
            //     DefaultFileNames = new List<string> {"/ClientApp/dist/client-app/index.html"}
            // });

            app.UseStaticFiles();
            app.UseRouting();
            

            // app.UseStaticFiles(new StaticFileOptions
            // {
            //     //Файловая система, используемая для определения поиска ресурсов
            //     FileProvider = new PhysicalFileProvider(
            //         Path.Combine(Directory.GetCurrentDirectory(), "/ClientApp/dist/client-app")),
            //     RequestPath = "/ClientApp/dist/client-app"
            // });
        }
    }
}