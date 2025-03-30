using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AcquisitionsAPI.Data;
using AcquisitionsAPI.Models;

namespace AcquisitionsAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcquisitionController : ControllerBase
    {
        private readonly AcquisitionsContext _context;

        public AcquisitionController(AcquisitionsContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Acquisition>>> GetAcquisitions()
        {
            return await _context.Acquisitions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Acquisition>> GetAcquisition(int id)
        {
            var acquisition = await _context.Acquisitions.FindAsync(id);
            if (acquisition == null) return NotFound();
            return acquisition;
        }

        [HttpPost]
        public async Task<ActionResult<Acquisition>> CreateAcquisition(Acquisition acquisition)
        {
            _context.Acquisitions.Add(acquisition);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAcquisition), new { id = acquisition.Id }, acquisition);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAcquisition(int id, Acquisition acquisition)
        {
            if (id != acquisition.Id) return BadRequest();

            _context.Entry(acquisition).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcquisition(int id)
        {
            var acquisition = await _context.Acquisitions.FindAsync(id);
            if (acquisition == null) return NotFound();

            _context.Acquisitions.Remove(acquisition);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Método para desactivar una adquisición
        [HttpPatch("{id}/deactivate")]
        public async Task<IActionResult> DeactivateAcquisition(int id)
        {
            var acquisition = await _context.Acquisitions.FindAsync(id);
            if (acquisition == null)
            {
                return NotFound();
            }

            acquisition.IsActive = false; // Cambiar el estado a inactivo
            _context.Entry(acquisition).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent(); // Respuesta sin contenido
        }

        // Método para activar una adquisición
        [HttpPatch("{id}/activate")]
        public async Task<IActionResult> ActivateAcquisition(int id)
        {
            var acquisition = await _context.Acquisitions.FindAsync(id);
            if (acquisition == null)
            {
                return NotFound();
            }

            acquisition.IsActive = true; // Cambiar el estado a activo
            _context.Entry(acquisition).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent(); // Respuesta sin contenido
        }
    }
}
