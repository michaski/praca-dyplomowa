﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BandClickBackend.Domain.Entities;

namespace BandClickBackend.Domain.Interfaces
{
    public interface IRhythmicUnitRepository
    {
        RhythmicUnit QuarterNote { get; }
        RhythmicUnit EightNote { get; }
        RhythmicUnit SixteenthNote { get; }
        Task<RhythmicUnit> GetRhythmicUnitByNumber(int number);
        Task<RhythmicUnit> GetRhythmicUnitByName(string name);
    }
}