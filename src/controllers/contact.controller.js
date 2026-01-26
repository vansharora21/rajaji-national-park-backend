import Contact from "../models/Contact.model.js";

// POST contact
export const createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !phone || !subject || !message)
      return res.status(400).json({ message: "All fields required" });

    await Contact.create({ name, email, phone, subject, message });

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET contacts (admin use)
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE single contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE all contacts
export const deleteAllContacts = async (req, res) => {
  try {
    await Contact.deleteMany({});
    res.status(200).json({ message: "All contacts deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET single contact by ID
export const getContactById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE contact status (read/replied)
export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({
      message: "Contact status updated successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// SEARCH contacts
export const searchContacts = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const contacts = await Contact.find({
      $or: [
        { name: { $regex: q, $options: "i" } },
        { email: { $regex: q, $options: "i" } },
        { subject: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// EXPORT contacts to CSV
export const exportContactsToCSV = async (req, res) => {
  try {
    const contacts = await Contact.find({});

    if (contacts.length === 0) {
      return res.status(404).json({ message: "No contacts to export" });
    }

    // Create CSV header
    const header = "Name,Email,Phone,Subject,Message,Date\n";
    
    // Create CSV rows
    const rows = contacts
      .map(
        (contact) =>
          `"${contact.name}","${contact.email}","${contact.phone}","${contact.subject}","${contact.message}","${contact.createdAt}"`
      )
      .join("\n");

    const csv = header + rows;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=contacts.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET contact statistics
export const getContactStats = async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalContacts,
      recentContacts,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
