@@ .. @@
 const mongoose = require('mongoose');
+const bcrypt = require('bcrypt');
+
 const userSchema = new mongoose.Schema({
   username: { 
     type: String, 
     unique: true, 
     required: true,
+    trim: true,
+    minlength: 3,
+    maxlength: 30,
+    match: /^[a-zA-Z0-9_]+$/
+  },
+  email: {
+    type: String,
+    unique: true,
+    sparse: true, // Allow null values but ensure uniqueness when present
+    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   },
-  password: { type: String, required: true },
-  role: { type: String, enum: ['admin', 'reception', 'staff', 'guest'], default: 'guest' }
-});
+  password: { 
+    type: String, 
+    required: true,
+    minlength: 6,
+    select: false // Don't include password in queries by default
+  },
+  role: { 
+    type: String, 
+    enum: ['admin', 'reception', 'staff', 'guest'], 
+    default: 'guest' 
+  },
+  isActive: {
+    type: Boolean,
+    default: true
+  },
+  lastLogin: {
+    type: Date
+  },
+  createdAt: {
+    type: Date,
+    default: Date.now
+  },
+  updatedAt: {
+    type: Date,
+    default: Date.now
+  }
+}, {
+  timestamps: true
+});
+
+// Index for performance
+userSchema.index({ username: 1 });
+userSchema.index({ email: 1 });
+
+// Pre-save middleware to hash password
+userSchema.pre('save', async function(next) {
+  // Only hash the password if it has been modified (or is new)
+  if (!this.isModified('password')) return next();
+
+  // Hash the password with cost of 12
+  this.password = await bcrypt.hash(this.password, 12);
+  next();
+});
+
+// Instance method to check password
+userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
+  return await bcrypt.compare(candidatePassword, userPassword);
+};
+
+// Update the updatedAt field before saving
+userSchema.pre('save', function(next) {
+  this.updatedAt = Date.now();
+  next();
+});
+
 module.exports = mongoose.model('User', userSchema);