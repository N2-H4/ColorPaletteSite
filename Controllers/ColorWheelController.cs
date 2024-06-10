using Microsoft.AspNetCore.Mvc;
using System.Text.Encodings.Web;

namespace ColorWheel.Controllers;

public class ColorWheelController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}