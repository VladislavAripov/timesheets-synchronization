using Microsoft.AspNetCore.Mvc;
using TimesheetsSynchronyzation.Domain.data;
using TimesheetsSynchronyzation.Domain.models;

namespace TimesheetsSynchronyzation.API.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly ILogger<ProductsController> _logger;
    private readonly TimesheetsSynchronizationContext _context;

    public ProductsController(ILogger<ProductsController> logger, TimesheetsSynchronizationContext context)
    {
        _logger = logger;
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Product> Get()
    {
        return _context.Products.ToList();
    }
}
