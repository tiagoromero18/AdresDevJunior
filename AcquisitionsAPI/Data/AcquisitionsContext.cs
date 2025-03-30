using Microsoft.EntityFrameworkCore;
using AcquisitionsAPI.Models;

namespace AcquisitionsAPI.Data
{
    public class AcquisitionsContext : DbContext
    {
        public AcquisitionsContext(DbContextOptions<AcquisitionsContext> options) : base(options) { }

        public DbSet<Acquisition> Acquisitions { get; set; }
    }
}

