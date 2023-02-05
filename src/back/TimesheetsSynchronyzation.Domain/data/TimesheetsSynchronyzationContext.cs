using Microsoft.EntityFrameworkCore;
using TimesheetsSynchronyzation.Domain.models;

namespace TimesheetsSynchronyzation.Domain.data;

public class TimesheetsSynchronizationContext : DbContext
{
    public DbSet<Product> Products { get; set; } = null!;

    public TimesheetsSynchronizationContext(DbContextOptions<TimesheetsSynchronizationContext> options) : base(options)
    {
        Database.EnsureCreated();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Product>().HasData(
            new Product(1, "", "Учет рабочего времени", "Описание", 10),
            new Product(2, "", "Расчет заработной платы", "Описание", 50),
            new Product(3, "", "Расчет налогового вычета", "Описание", 500),
            new Product(4, "", "Анализ налоговой базы", "Описание", 100000),
            new Product(5, "", "Расчет налоговой базы", "Описание", 5000)
        );
    }
}
