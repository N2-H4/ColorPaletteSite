using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace OneColorPalette.Controllers;

public class OneColorPaletteController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}