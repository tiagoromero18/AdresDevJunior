using Microsoft.EntityFrameworkCore;
using AcquisitionsAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Agregar servicios
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración de la base de datos SQLite
builder.Services.AddDbContext<AcquisitionsContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(policy =>
    policy.AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader());

app.UseDeveloperExceptionPage(); 

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();

