namespace AcquisitionsAPI.Models
{
    public class Acquisition
    {
        public int Id { get; set; }
        public int Budget { get; set; }
        public string Unit { get; set; } = string.Empty;
        public string ServiceType { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitValue { get; set; }
        public decimal TotalValue { get; set; }
        public DateTime AcquisitionDate { get; set; }
        public string Supplier { get; set; } = string.Empty;
        public string Documentation { get; set; } = string.Empty;

        public bool IsActive { get; set; } = true;
    }
}
