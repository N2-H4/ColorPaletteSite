using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace BrandColor.Controllers;

public class BrandColorController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}